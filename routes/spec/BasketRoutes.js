const express = require("express");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const CompanyCarNumber = require("../../models/CompanyCarNumber");
const Company = require("../../models/Company");
const normalizeValues = require("../../utils/convertCommasToDots");
const ProposalBasket = require("../../models/spec/ProposalBasket");
const Proposal = require("../../models/spec/Proposal");
const ProposalWarehouseStatus = require("../../models/spec/ProposalWarehouseStatus");
const BasketCarNumber = require("../../models/spec/BasketCarNumber");
const ProposalBasketLocalExpenses = require("../../models/spec/ProposalBasketLocalExpenses");
const ProposalBasketStockStatus = require("../../models/spec/ProposalBasketStockStatus");
const User = require("../../models/User");
const sequelize = require("../../config/db");
const Decimal = require("decimal.js");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const normalized = normalizeValues(req.body);

    console.log(normalized);

    if (!normalized.proposal_ids || normalized.proposal_ids.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Не переданы идентификаторы заявок",
      });
    }

    const proposals = await Proposal.findAll({
      where: {
        id: normalized.proposal_ids,
      },
      include: [
        {
          model: ProposalWarehouseStatus,
          as: "warehouse_statuses",
        },
      ],
    });

    const proposalsWithMissingData = proposals.filter(
      (proposal) =>
        proposal.actual_weight === null ||
        proposal.actual_dshv === null ||
        proposal.actual_rate_usd === null
    );

    if (proposalsWithMissingData.length > 0) {
      const missingProposalNumbers = proposalsWithMissingData.map(
        (proposal) => proposal.proposal_number
      );
      return res.status(400).json({
        status: "error",
        message: `Нет фактических данных у заявок: ${missingProposalNumbers.join(
          ", "
        )}`,
      });
    }

    // Проверка на наличие заявок в другой корзине
    const proposalsInAnotherBasket = proposals.filter(
      (proposal) => proposal.proposal_basket_id !== null
    );

    if (proposalsInAnotherBasket.length > 0) {
      const inAnotherBasketNumbers = proposalsInAnotherBasket.map(
        (proposal) => proposal.proposal_number
      );
      return res.status(400).json({
        status: "error",
        message: `Заявки ${inAnotherBasketNumbers.join(
          ", "
        )} уже находятся в другой корзине`,
      });
    }

    const total_quantity = proposals
      .reduce(
        (acc, proposal) => acc.plus(new Decimal(proposal.actual_quantity)),
        new Decimal(0)
      )
      .toFixed(2);

    const total_weight = proposals
      .reduce(
        (acc, proposal) => acc.plus(new Decimal(proposal.actual_weight)),
        new Decimal(0)
      )
      .toFixed(2);

    const total_dshv = proposals
      .reduce(
        (acc, proposal) => acc.plus(new Decimal(proposal.actual_dshv)),
        new Decimal(0)
      )
      .toFixed(2);

    const total_rate_usd = proposals
      .reduce(
        (acc, proposal) => acc.plus(new Decimal(proposal.actual_rate_usd)),
        new Decimal(0)
      )
      .toFixed(2);

    const fullData = {
      ...normalized,
      total_quantity,
      total_weight,
      total_dshv,
      total_rate_usd,
      total_rate_kzt: 0,
      warehouse_id: proposals[0].warehouse_statuses[0].warehouse_id,
    };

    const newBasket = await ProposalBasket.create(fullData);

    // если есть автомашины
    if (normalized.cars.length > 0) {
      const basketCars = await BasketCarNumber.bulkCreate(
        normalized.cars.map((car) => ({
          company_car: car.company_car,
          frakht_currency: car.frakht_currency,
          frakht: car.frakht,
          proposal_basket_id: newBasket.id,
        }))
      );

      // Добавляем их к заявкам
      // Перед обновлением заявки нужно найти автомашины, могут добавиться новые

      const updatedBasket = await ProposalBasket.findOne({
        where: {
          id: newBasket.id,
        },
        include: [
          {
            model: BasketCarNumber,
            as: "cars",
            include: [
              {
                model: CompanyCarNumber,
                as: "company_car_number",
              },
            ],
          },
        ],
      });

      await Proposal.update(
        {
          proposal_basket_id: newBasket.id,
          car_registration_number: updatedBasket.cars
            .map((car) => car.company_car_number.car_registration_number)
            .join(" ,"),
          loading_list_number: normalized.internal_order_number,
        },
        {
          where: {
            id: normalized.proposal_ids,
          },
        }
      );
    }

    console.log(newBasket);

    return res.status(200).json({ status: "success", newBasket });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const baskets = await ProposalBasket.findAll({
      include: [
        {
          model: Proposal,
          as: "proposals",
          include: [
            {
              model: ProposalWarehouseStatus,
              as: "warehouse_statuses",
            },
            {
              model: Company,
              as: "client",
            },
            {
              model: Company,
              as: "company",
            },

            {
              model: Company,
              as: "broker",
            },
            {
              model: User,
              as: "sales_manager",
            },
          ],
        },
        {
          model: BasketCarNumber,
          as: "cars",
          include: [
            {
              model: CompanyCarNumber,
              as: "company_car_number",
            },
          ],
        },
        {
          model: ProposalBasketLocalExpenses,
          as: "local_expenses",
        },
        {
          model: ProposalBasketStockStatus,
          as: "stock_statuses",
          order: [["createdAt", "ASC"]],
        },
      ],
      order: [
        [
          sequelize.cast(sequelize.col("internal_order_number"), "DECIMAL"),
          "ASC",
        ],
      ],
    });
    res.status(200).json({ status: "success", baskets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const normalized = normalizeValues(req.body);

    console.log("id", req.params.id);

    const basket = await ProposalBasket.findOne({
      where: {
        id: req.params.id,
      },
    });

    let total_rate_kzt = 0;

    if (normalized.usd_exchange_rate) {
      // Создаем Decimal объекты для более точных вычислений
      const totalRateUsd = new Decimal(normalized.total_rate_usd);
      const exchangeRate = new Decimal(normalized.usd_exchange_rate);

      // Умножаем сумму в USD на обменный курс и округляем до двух знаков после запятой
      const totalRateKzt = totalRateUsd.times(exchangeRate).toFixed(2);

      total_rate_kzt = parseFloat(totalRateKzt);
    }

    const baskets = await ProposalBasket.update(
      {
        ...normalized,
        total_rate_kzt,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // если есть автомашины
    if (normalized.cars.length > 0) {
      normalized.cars.map(async (car) => {
        await BasketCarNumber.findOrCreate({
          where: {
            company_car: car.company_car,
            frakht_currency: car.frakht_currency,
            frakht: car.frakht,
            proposal_basket_id: req.params.id,
          },
          defaults: car,
        });
      });
    }

    if (normalized.stock_statuses.length > 0) {
      await ProposalBasketStockStatus.destroy({
        where: {
          proposal_basket_id: req.params.id,
        },
      });

      await ProposalBasketStockStatus.bulkCreate(
        normalized.stock_statuses.map((stock) => ({
          stage: stock.stage,
          description: stock.description,
          date: stock.date,
          proposal_basket_id: req.params.id,
        }))
      );
    }

    if (normalized.local_expenses.length > 0) {
      await ProposalBasketLocalExpenses.destroy({
        where: {
          proposal_basket_id: req.params.id,
        },
      });

      await ProposalBasketLocalExpenses.bulkCreate(
        normalized.local_expenses.map((local_expense) => ({
          description: local_expense.description,
          price: local_expense.price,
          currency: local_expense.currency,
          proposal_basket_id: req.params.id,
        }))
      );
    }

    // Перед обновлением заявки нужно найти автомашины, могут добавиться новые

    const updatedBasket = await ProposalBasket.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: BasketCarNumber,
          as: "cars",
          include: [
            {
              model: CompanyCarNumber,
              as: "company_car_number",
            },
          ],
        },
      ],
    });

    await Proposal.update(
      {
        proposal_basket_id: req.params.id,
        car_registration_number: updatedBasket.cars
          .map((car) => car.company_car_number.car_registration_number)
          .join(" ,"),
        loading_list_number: normalized.internal_order_number,
        arrival_date: normalized.arrival_date,
      },
      {
        where: {
          id: normalized.proposal_ids,
        },
      }
    );

    res.status(200).json({ status: "success", baskets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await BasketCarNumber.destroy({
      where: {
        proposal_basket_id: req.params.id,
      },
    });

    const baskets = await ProposalBasket.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", baskets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/labels", auth, async (req, res) => {
  try {
    const companyCars = await CompanyCarNumber.findAll({
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
      attributes: ["id", "car_registration_number", "company_id"],
    });
    const labels = companyCars.map((companyCar) => {
      return {
        id: companyCar.id,
        label: `${companyCar.car_registration_number} | ${companyCar.company.company_name}`,
        company_id: companyCar.company_id,
      };
    });
    return res.status(200).json({ status: "success", labels });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    console.log("HELLO ID");

    const basket = await ProposalBasket.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: BasketCarNumber,
          as: "cars",
          include: [
            {
              model: CompanyCarNumber,
              as: "company_car_number",
            },
          ],
        },
        {
          model: ProposalBasketLocalExpenses,
          as: "local_expenses",
        },
        {
          model: ProposalBasketStockStatus,
          as: "stock_statuses",
        },
      ],
      reload: true,
    });

    if (!basket) {
      return res.status(404).json({
        status: "error",
        message: "Basket not found",
      });
    }

    res.status(200).json({ status: "success", basket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/car/:id", auth, async (req, res) => {
  try {
    const car = await BasketCarNumber.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", car });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
