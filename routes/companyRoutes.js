const express = require("express");
const {
  getAllCompanies,
  addCompany,
  editCompany,
  getCompanyById,
  deleteCompany,
  getCompaniesWithLabel,
  deleteCompanyCar,
} = require("../controllers/companyController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAllCompanies);
router.post("/", auth, addCompany);
router.patch("/:id", auth, editCompany);
router.get("/labels", auth, getCompaniesWithLabel);
router.get("/:id", auth, getCompanyById);
router.delete("/:id", auth, deleteCompany);
router.delete("/company-car/:id", auth, deleteCompanyCar);

module.exports = router;
