const express = require("express");
const {
  getAllProposals,
  addProposal,
  editProposal,
  createWarehouseStatus,
  editWarehouseStatus,
  deleteProposal,
  getProposalById,
  deleteLocalExpense,
  createLocalExpense,
  getAllArchivedProposals,
} = require("../controllers/proposalController");

const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAllProposals);
router.get("/archived", auth, getAllArchivedProposals);
router.get("/:id", auth, getProposalById);
router.post("/", auth, addProposal);
router.patch("/:id", auth, editProposal);
router.post("/warehouse-status/:proposalId", auth, createWarehouseStatus);
router.patch("/warehouse-status/:proposalId", auth, editWarehouseStatus);
router.delete("/:id", auth, deleteProposal);

router.post("/local-expense/:proposalId", auth, createLocalExpense);
router.delete("/local-expense/:localExpenseId", auth, deleteLocalExpense);

module.exports = router;
