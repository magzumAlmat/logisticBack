const { Sequelize, Op } = require("sequelize");
const ProposalRailway = require("../../models/railway/ProposalRailway");
const normalizeValues = require("../../utils/convertCommasToDots");
const Decimal = require("decimal.js");
const Company = require("../../models/Company");
const User = require("../../models/User");
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
            route: { [Op.iLike]: `%${search}%` },
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
            "$agent_knr.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.email$": {
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

    const proposals = await ProposalRailway.findAll({
      where: {
        ...whereClause,
        proposal_status: ["Согласован", "В работе", "Внимание"],
      },
      include: [
        {
          model: Company,
          as: "client",
          foreignKey: "client_id",
        },
        {
          model: Company,
          as: "agent_knr",
          foreignKey: "agent_knr_id",
        },
        {
          model: Company,
          as: "broker",
          foreignKey: "broker_id",
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
            route: { [Op.iLike]: `%${search}%` },
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
            "$agent_knr.company_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.company_bin$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.address$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.phone$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.contact_name$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$agent_knr.email$": {
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

    const proposals = await ProposalRailway.findAll({
      where: {
        ...whereClause,
        proposal_status: ["Завершено"],
      },
      include: [
        {
          model: Company,
          as: "client",
          foreignKey: "client_id",
        },
        {
          model: Company,
          as: "agent_knr",
          foreignKey: "agent_knr_id",
        },
        {
          model: Company,
          as: "broker",
          foreignKey: "broker_id",
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
    const normalizedData = normalizeValues(req.body);

    let payment_percent_knr = 0;
    let payment_percent_rk = 0;

    if (normalizedData.prepayment_knr && normalizedData.rate_knr_dollars) {
      const prepaymentKNR = new Decimal(normalizedData.prepayment_knr);
      const rateKNRDollars = new Decimal(normalizedData.rate_knr_dollars);

      payment_percent_knr = prepaymentKNR
        .dividedBy(rateKNRDollars)
        .times(100)
        .toNumber();
    }

    if (normalizedData.prepayment_rk && normalizedData.rate_rk_dollars) {
      const prepaymentRK = new Decimal(normalizedData.prepayment_rk);
      const rateRKDollars = new Decimal(normalizedData.rate_rk_dollars);

      payment_percent_rk = prepaymentRK
        .dividedBy(rateRKDollars)
        .times(100)
        .toNumber();
    }

    let price_kzt = 0;
    let price_knr = 0;

    if (normalizedData.usd_exchange_rate && normalizedData.rate_rk_dollars) {
      const usdRate = new Decimal(normalizedData.usd_exchange_rate);
      const rateRKDollars = new Decimal(normalizedData.rate_rk_dollars);
      price_kzt = rateRKDollars.times(usdRate).toNumber();
    }

    if (normalizedData.usd_exchange_rate && normalizedData.rate_knr_dollars) {
      const usdRate = new Decimal(normalizedData.usd_exchange_rate);
      const rateKNRDollars = new Decimal(normalizedData.rate_knr_dollars);
      price_knr = rateKNRDollars.times(usdRate).toNumber();
    }

    const { id, ...fullData } = {
      ...normalizedData,
      client_id: req.body.client_id || null,
      agent_knr_id: req.body.agent_knr_id || null,
      broker_id: req.body.broker_id || null,
      sales_manager_id: req.user.id,
      price_kzt,
      price_knr,
      payment_percent_knr,
      payment_percent_rk,
    };

    Object.keys(fullData).forEach((key) => {
      if (typeof fullData[key] === "string" && fullData[key].trim() === "") {
        fullData[key] = null;
      }
    });

    console.log(fullData);

    const proposal = await ProposalRailway.create(fullData);

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

    let payment_percent_knr = 0;
    let payment_percent_rk = 0;

    if (normalizedData.prepayment_knr && normalizedData.rate_knr_dollars) {
      const prepaymentKNR = new Decimal(normalizedData.prepayment_knr);
      const rateKNRDollars = new Decimal(normalizedData.rate_knr_dollars);

      payment_percent_knr = prepaymentKNR
        .dividedBy(rateKNRDollars)
        .times(100)
        .toNumber();
    }

    if (normalizedData.prepayment_rk && normalizedData.rate_rk_dollars) {
      const prepaymentRK = new Decimal(normalizedData.prepayment_rk);
      const rateRKDollars = new Decimal(normalizedData.rate_rk_dollars);

      payment_percent_rk = prepaymentRK
        .dividedBy(rateRKDollars)
        .times(100)
        .toNumber();
    }

    let price_kzt = 0;
    let price_knr = 0;

    if (normalizedData.usd_exchange_rate && normalizedData.rate_rk_dollars) {
      const usdRate = new Decimal(normalizedData.usd_exchange_rate);
      const rateRKDollars = new Decimal(normalizedData.rate_rk_dollars);
      price_kzt = rateRKDollars.times(usdRate).toNumber();
    }

    if (normalizedData.usd_exchange_rate && normalizedData.rate_knr_dollars) {
      const usdRate = new Decimal(normalizedData.usd_exchange_rate);
      const rateKNRDollars = new Decimal(normalizedData.rate_knr_dollars);
      price_knr = rateKNRDollars.times(usdRate).toNumber();
    }

    const { id, ...fullData } = {
      ...normalizedData,
      client_id: req.body.client_id || null,
      agent_knr_id: req.body.agent_knr_id || null,
      broker_id: req.body.broker_id || null,
      sales_manager_id: req.user.id,
      price_kzt,
      price_knr,
      payment_percent_knr,
      payment_percent_rk,
    };

    Object.keys(fullData).forEach((key) => {
      if (typeof fullData[key] === "string" && fullData[key].trim() === "") {
        fullData[key] = null;
      }
    });

    console.log("full", fullData);

    const proposal = await ProposalRailway.update(fullData, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      proposal,
    });
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: err.message });
  }
};

const deleteProposal = async (req, res) => {
  try {
    await ProposalRailway.destroy({
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
    const proposal = await ProposalRailway.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Company,
          as: "client",
          foreignKey: "client_id",
        },
        {
          model: Company,
          as: "agent_knr",
          foreignKey: "agent_knr_id",
        },
        {
          model: Company,
          as: "broker",
          foreignKey: "broker_id",
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

module.exports = {
  getAllProposals,
  getAllArchivedProposals,
  addProposal,
  editProposal,
  deleteProposal,
  getProposalById,
};
