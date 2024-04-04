/* eslint-disable camelcase */

const ProposalWarehouseStatus = require("../models/ProposalWarehouseStatus");
const Warehouse = require("../models/Warehouse");
const Proposal = require("../models/Proposal");
const { Sequelize } = require("sequelize");

const createWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(200).json(warehouse);
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.status(200).json(warehouses);
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const editWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(warehouse);
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(warehouse);
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Всегда происходит создание - чтобы отслеживать путь
const moveProposalsToWarehouse = async (req, res) => {
  try {
    const { proposal_ids, status, warehouse_id, date } = req.body;
    console.log(req.body);
    const warehouseStatusData = proposal_ids.map((proposal_id) => ({
      proposal_id,
      status,
      warehouse_id,
      date,
    }));

    const warehouseStatuses =
      await ProposalWarehouseStatus.bulkCreate(warehouseStatusData);
    res.status(200).json(warehouseStatuses);
  } catch (err) {
    console.log(err.name, err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createWarehouse,
  getAllWarehouses,
  editWarehouse,
  deleteWarehouse,
  moveProposalsToWarehouse,
};
