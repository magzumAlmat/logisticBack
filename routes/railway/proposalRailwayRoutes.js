const express = require("express");
const {
  getAllProposals,
  addProposal,
  editProposal,
  deleteProposal,
  getProposalById,
  getAllArchivedProposals,
} = require("../../controllers/railway/proposalRailwayController");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAllProposals);
router.get("/archived", auth, getAllArchivedProposals);
router.get("/:id", auth, getProposalById);
router.post("/", auth, addProposal);
router.patch("/:id", auth, editProposal);
router.delete("/:id", auth, deleteProposal);

module.exports = router;
