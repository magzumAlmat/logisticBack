const express = require("express");
const {
  createWarehouse,
  getAllWarehouses,
  editWarehouse,
  moveProposalsToWarehouse,
} = require("../../controllers/spec/warehouseController");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");

const router = express.Router();

router.post("/move", auth, moveProposalsToWarehouse);
router.get("/", auth, getAllWarehouses);
router.post("/", auth, isAdmin, createWarehouse);
router.patch("/:id", auth, editWarehouse);
// Удаление чревато внешней таблицей - связь с таблицей Proposal Warehouse Status
// router.delete("/:id", deleteWarehouse);

module.exports = router;
