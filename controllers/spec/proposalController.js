const { Sequelize, Op } = require("sequelize");
const Company = require("../../models/Company");
const Proposal = require("../../models/spec/Proposal");
// const ProposalBasket = require("../models/ProposalBasket");
const ProposalLocalExpenses = require("../../models/spec/ProposalLocalExpenses");
const ProposalWarehouseStatus = require("../../models/spec/ProposalWarehouseStatus");
const Warehouse = require("../../models/spec/Warehouse");
const User = require("../../models/User");
const normalizeValues = require("../../utils/convertCommasToDots");
const Decimal = require("decimal.js");
const sequelize = require("../../config/db");

const getAllProposals = async (req, res) => {
  try {
    const { search } = req.query;

    let whereClause = {};

    if (search && search !== "") {
      whereClause = {
        [Op.or]: [
          { proposal_number: { [Op.iLike]: `%${search}%` } },
          {
            location_from: { [Op.iLike]: `%${search}%` },
          },
          {
            location_to: { [Op.iLike]: `%${search}%` },
          },
          {
            account_number: { [Op.iLike]: `%${search}%` },
          },
          {
            avr_number: { [Op.iLike]: `%${search}%` },
          },
          {
            invoice: { [Op.iLike]: `%${search}%` },
          },
          {
            description: { [Op.iLike]: `%${search}%` },
          },
          {
            "$client.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.email$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.email$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.email$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$sales_manager.full_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            cargo_name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }

    const proposals = await Proposal.findAll({
      where: {
        ...whereClause,
        proposal_basket_id: null,
      },
      include: [
        {
          model: Company,
          as: "client",
          foreignKey: "client_id",
        },
        {
          model: Company,
          as: "company",
          foreignKey: "company_id",
        },
        {
          model: Company,
          as: "broker",
          foreignKey: "broker_id",
        },
        {
          model: ProposalWarehouseStatus,
          as: "warehouse_statuses",
          include: [
            {
              model: Warehouse,
              as: "warehouse",
            },
          ],
          order: [["createdAt", "ASC"]],
          separate: true,
        },
        {
          model: ProposalLocalExpenses,
          as: "local_expenses",
        },
        {
          model: User,
          foreignKey: "sales_manager_id",
          as: "sales_manager",
          attributes: ["id", "full_name", "role"],
        },
      ],
      order: [
        [sequelize.cast(sequelize.col("proposal_number"), "DECIMAL"), "ASC"],
      ],
    });

    res.status(200).json({
      status: "success",
      proposals,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllArchivedProposals = async (req, res) => {
  try {
    const { search } = req.query;

    let whereClause = {};

    if (search && search !== "") {
      whereClause = {
        [Op.or]: [
          { proposal_number: { [Op.iLike]: `%${search}%` } },
          {
            location_from: { [Op.iLike]: `%${search}%` },
          },
          {
            location_to: { [Op.iLike]: `%${search}%` },
          },
          {
            account_number: { [Op.iLike]: `%${search}%` },
          },
          {
            avr_number: { [Op.iLike]: `%${search}%` },
          },
          {
            invoice: { [Op.iLike]: `%${search}%` },
          },
          {
            description: { [Op.iLike]: `%${search}%` },
          },
          {
            "$client.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$client.email$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$company.email$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$broker.email$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$sales_manager.full_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            cargo_name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }

    // Исключить те, у которых есть proposal_basket_id
    const proposals = await Proposal.findAll({
      where: {
        ...whereClause,
        proposal_basket_id: {
          [Sequelize.Op.not]: null,
        },
      },
      include: [
        {
          model: Company,
          as: "client",
          foreignKey: "client_id",
        },
        {
          model: Company,
          as: "company",
          foreignKey: "company_id",
        },
        {
          model: Company,
          as: "broker",
          foreignKey: "broker_id",
        },
        {
          model: ProposalWarehouseStatus,
          as: "warehouse_statuses",
          include: [
            {
              model: Warehouse,
              as: "warehouse",
            },
          ],
          order: [["createdAt", "ASC"]],
          separate: true,
        },
        {
          model: ProposalLocalExpenses,
          as: "local_expenses",
        },
        {
          model: User,
          foreignKey: "sales_manager_id",
          as: "sales_manager",
          attributes: ["id", "full_name", "role"],
        },
      ],
      order: [
        [sequelize.cast(sequelize.col("proposal_number"), "DECIMAL"), "ASC"],
      ],
    });

    res.status(200).json({
      status: "success",
      proposals,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addProposal = async (req, res) => {
  try {
    // При создании в основном принимаются заявленные данные
    const normalizedData = normalizeValues(req.body);

    let payment_percent = 0;

    if (normalizedData.prepayment && normalizedData.declared_rate_usd) {
      const prepayment = new Decimal(normalizedData.prepayment);
      const declaredRateUSD = new Decimal(normalizedData.declared_rate_usd);

      payment_percent = prepayment
        .dividedBy(declaredRateUSD)
        .times(100)
        .toNumber();
    }

    let rate_kzt = 0;

    if (normalizedData.declared_rate_usd && normalizedData.prepayment_rate) {
      const declaredRateUSD = new Decimal(normalizedData.declared_rate_usd);
      const prepaymentRate = new Decimal(normalizedData.prepayment_rate);

      rate_kzt = declaredRateUSD.times(prepaymentRate).toNumber();
    }

    const { id, ...fullData } = {
      ...normalizedData,
      client_id: req.body.client_id || null,
      company_id: req.body.company_id || null,
      broker_id: req.body.broker_id || null,
      sales_manager_id: req.user.id,
      proposal_status: "В работе",
      rate_kzt,
      payment_percent,
    };

    Object.keys(fullData).forEach((key) => {
      if (typeof fullData[key] === "string" && fullData[key].trim() === "") {
        fullData[key] = null;
      }
    });

    console.log(fullData);

    const proposal = await Proposal.create(fullData);

    res.status(200).json({
      status: "success",
      proposal,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: err.message });
  }
};

const editProposal = async (req, res) => {
  try {
    // Меняет запятые на точки
    const normalizedData = normalizeValues(req.body);

    console.log("normalized", normalizedData);

    let payment_percent = 0;

    if (
      normalizedData.prepayment &&
      normalizedData.declared_rate_usd &&
      !normalizedData.actual_rate_usd
    ) {
      const prepayment = new Decimal(normalizedData.prepayment);
      const declaredRateUSD = new Decimal(normalizedData.declared_rate_usd);

      payment_percent = prepayment
        .dividedBy(declaredRateUSD)
        .times(100)
        .toNumber();
    } else if (normalizedData.prepayment && normalizedData.actual_rate_usd) {
      const prepayment = new Decimal(normalizedData.prepayment);
      const actualRateUSD = new Decimal(normalizedData.actual_rate_usd);

      payment_percent = prepayment
        .dividedBy(actualRateUSD)
        .times(100)
        .toNumber();
    }

    let rate_kzt;

    if (
      normalizedData.prepayment &&
      normalizedData.declared_rate_usd &&
      normalizedData.prepayment_rate &&
      !normalizedData.actual_rate_usd
    ) {
      const declaredRateUSD = new Decimal(normalizedData.declared_rate_usd);
      const prepaymentRate = new Decimal(normalizedData.prepayment_rate);

      rate_kzt = declaredRateUSD.times(prepaymentRate).toNumber();
    } else if (
      normalizedData.prepayment &&
      normalizedData.actual_rate_usd &&
      normalizedData.prepayment_rate
    ) {
      const actualRateUSD = new Decimal(normalizedData.actual_rate_usd);
      const prepaymentRate = new Decimal(normalizedData.prepayment_rate);

      rate_kzt = actualRateUSD.times(prepaymentRate).toNumber();
    }

    const fullData = {
      ...normalizedData,
      client_id: req.body.client_id || null,
      company_id: req.body.company_id || null,
      broker_id: req.body.broker_id || null,
      sales_manager_id: req.user.id,
      rate_kzt,
      payment_percent,
    };

    console.log("full", fullData);

    const proposal = await Proposal.update(fullData, {
      where: {
        id: req.params.id,
      },
    });

    if (normalizedData.local_expenses) {
      await ProposalLocalExpenses.destroy({
        where: {
          proposal_id: req.params.id,
        },
      });

      const localExpenses = normalizedData.local_expenses.map((expense) => ({
        price: expense.price,
        description: expense.description,
        currency: expense.currency,
        proposal_id: req.params.id,
      }));

      await ProposalLocalExpenses.bulkCreate(localExpenses);
    }

    res.status(200).json({
      status: "success",
      proposal,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: err.message });
  }
};

const createWarehouseStatus = async (req, res) => {
  console.log("Hello");
  try {
    const warehouseStatus = await ProposalWarehouseStatus.create({
      ...req.body,
      proposal_id: req.params.proposalId,
    });
    res.status(200).json({
      status: "success",
      warehouseStatus,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const editWarehouseStatus = async (req, res) => {
  try {
    const warehouseStatus = await ProposalWarehouseStatus.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.proposalId,
        },
      }
    );

    res.status(200).json({
      status: "success",
      warehouseStatus,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteProposal = async (req, res) => {
  try {
    await ProposalWarehouseStatus.destroy({
      where: {
        proposal_id: req.params.id,
      },
    });

    await ProposalLocalExpenses.destroy({
      where: {
        proposal_id: req.params.id,
      },
    });

    await Proposal.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Proposal deleted",
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Company,
          as: "company",
          foreignKey: "company_id",
        },
        {
          model: Company,
          as: "broker",
          foreignKey: "broker_id",
        },
        {
          model: ProposalWarehouseStatus,
          as: "warehouse_statuses",
          include: [
            {
              model: Warehouse,
              as: "warehouse",
            },
          ],
          order: [["createdAt", "ASC"]],
          separate: true,
        },
        {
          model: ProposalLocalExpenses,
          as: "local_expenses",
        },
        {
          model: User,
          foreignKey: "sales_manager_id",
          as: "sales_manager",
          attributes: ["id", "full_name", "role"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      proposal,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createLocalExpense = async (req, res) => {
  try {
    const decimal_price = normalizeValues(req.body.price);

    const localExpense = await ProposalLocalExpenses.create({
      currency: req.body.currency,
      price: decimal_price,
      description: req.body.description,
      proposal_id: req.params.proposalId,
    });
    res.status(200).json({
      status: "success",
      localExpense,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteLocalExpense = async (req, res) => {
  try {
    const localExpense = await ProposalLocalExpenses.destroy({
      where: {
        id: req.params.localExpenseId,
      },
    });
    res.status(200).json({
      status: "success",
      localExpense,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllProposals,
  addProposal,
  editProposal,
  createWarehouseStatus,
  editWarehouseStatus,
  deleteProposal,
  getProposalById,
  createLocalExpense,
  deleteLocalExpense,
  getAllArchivedProposals,
};
