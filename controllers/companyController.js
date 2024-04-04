const { Op } = require("sequelize");
const Company = require("../models/Company");
const CompanyCarNumber = require("../models/CompanyCarNumber");

const getAllCompanies = async (req, res) => {
  try {
    const { search } = req.query;

    let whereClause = {};

    if (search && search !== "") {
      whereClause = {
        [Op.or]: [
          { company_name: { [Op.iLike]: `%${search}%` } },
          {
            company_bin: { [Op.iLike]: `%${search}%` },
          },
          {
            contact_name: { [Op.iLike]: `%${search}%` },
          },
          {
            phone: { [Op.iLike]: `%${search}%` },
          },
          {
            email: { [Op.iLike]: `%${search}%` },
          },
          {
            address: { [Op.iLike]: `%${search}%` },
          },
          {
            contract: { [Op.iLike]: `%${search}%` },
          },
          {
            "$cars.car_registration_number$": {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }

    const companies = await Company.findAll({
      where: whereClause,
      include: [
        {
          model: CompanyCarNumber,
          as: "cars",
          attributes: ["car_registration_number", "id"],
        },
      ],
      order: [["company_name", "ASC"]],
    });

    res.status(200).json({
      status: "success",
      companies: companies,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const addCompany = async (req, res) => {
  try {
    if (req.body.address === "" || req.body.company_name === "") {
      return res.status(400).json({
        status: "fail",
        error: "У компании должен быть хотя бы адрес и название",
      });
    }

    const existingCompany = await Company.findOne({
      where: {
        company_name: req.body.company_name,
        company_bin: req.body.company_bin,
      },
    });

    if (existingCompany) {
      return res.status(400).json({
        status: "fail",
        error: "Компания с таким названием или БИН уже существует",
      });
    }

    const newCompany = await Company.create({
      company_name: req.body.company_name,
      company_bin: req.body.company_bin,
      contact_name: req.body.contact_name,
      phone: req.body.phone,
      email: req.body.email,
      contract: req.body.contract,
      contract_date: req.body.contract_date,
      contract_color: req.body.contract_color,
      address: req.body.address,
      isExecutor: req.body.isExecutor,
      isClient: req.body.isClient,
    });

    if (req.body.cars) {
      const carsWithId = req.body.cars.map((car) => ({
        car_registration_number: car.car_registration_number,
        company_id: newCompany.id,
      }));

      console.log(carsWithId);

      await CompanyCarNumber.bulkCreate(carsWithId);
    }

    res.status(200).json({
      status: "success",
      newCompany,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const editCompany = async (req, res) => {
  try {
    if (req.body.address === "" || req.body.company_name === "") {
      return res.status(400).json({
        status: "fail",
        error: "У компании должен быть хотя бы адрес и название",
      });
    }

    console.log(req.body);

    const company = await Company.update(
      {
        company_name: req.body.company_name,
        company_bin: req.body.company_bin,
        contact_name: req.body.contact_name,
        phone: req.body.phone,
        email: req.body.email,
        contract: req.body.contract,
        contract_date: req.body.contract_date,
        contract_color: req.body.contract_color,
        address: req.body.address,
        isExecutor: req.body.isExecutor,
        isClient: req.body.isClient,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (req.body.cars) {
      const carsWithId = req.body.cars.map((car) => ({
        car_registration_number: car.car_registration_number,
        company_id: req.params.id,
      }));

      carsWithId.map(async (car) => {
        await CompanyCarNumber.findOrCreate({
          where: {
            car_registration_number: car.car_registration_number,
            company_id: req.params.id,
          },
          defaults: car,
        });
      });
    }

    res.status(200).json({
      status: "success",
      company,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: CompanyCarNumber,
          as: "cars",
          attributes: ["car_registration_number", "id"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      company: company,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      company,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getCompaniesWithLabel = async (req, res) => {
  try {
    const companies = await Company.findAll();

    const formattedData = companies.map((company) => ({
      label: `${company.company_name} | адрес: ${company.address}`,
      id: company.id,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteCompanyCar = async (req, res) => {
  try {
    const companyCar = await CompanyCarNumber.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      companyCar,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllCompanies,
  addCompany,
  editCompany,
  getCompanyById,
  deleteCompany,
  getCompaniesWithLabel,
  deleteCompanyCar,
};
