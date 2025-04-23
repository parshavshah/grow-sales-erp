var express = require("express");
var router = express.Router();

const BaseController = require("../controllers/base.controller");
const EmployeeController = require("../controllers/employee.controller");
const TaxController = require("../controllers/tax.controller");
const PaymentMethodController = require("../controllers/paymentmethod.controller");
const LeadController = require("../controllers/lead.controller");
const AccountController = require("../controllers/account.controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", layout: "layouts/admin_layout" });
});

router.get("/base/list", BaseController.listRecordView);
router.post("/base/create", BaseController.createRecordAPI);
router.patch("/base/update/:id", BaseController.updateRecordAPI);
router.get("/base/read/:id", BaseController.readRecordAPI);
router.delete("/base/delete/:id", BaseController.deleteRecordAPI);

router.get("/employee/list", EmployeeController.listEmployeeView);
router.post("/employee/create", EmployeeController.createEmployeeAPI);
router.patch("/employee/update/:id", EmployeeController.updateEmployeeAPI);
router.get("/employee/read/:id", EmployeeController.readEmployeeAPI);
router.delete("/employee/delete/:id", EmployeeController.deleteEmployeeAPI);
router.patch("/employee/status/:id", EmployeeController.updateEmployeeStatusAPI);

router.get("/tax/list", TaxController.listTaxView);
router.post("/tax/create", TaxController.createTaxAPI);
router.patch("/tax/update/:id", TaxController.updateTaxAPI);
router.get("/tax/read/:id", TaxController.readTaxAPI);
router.delete("/tax/delete/:id", TaxController.deleteTaxAPI);

router.get("/paymentmethod/list", PaymentMethodController.listPaymentMethodView);
router.post("/paymentmethod/create", PaymentMethodController.createPaymentMethodAPI);
router.patch("/paymentmethod/update/:id", PaymentMethodController.updatePaymentMethodAPI);
router.get("/paymentmethod/read/:id", PaymentMethodController.readPaymentMethodAPI);
router.delete("/paymentmethod/delete/:id", PaymentMethodController.deletePaymentMethodAPI);
router.patch("/paymentmethod/status/:id", PaymentMethodController.updatePaymentMethodStatusAPI);

// Lead routes
router.get("/lead/list", LeadController.listLeadView);
router.post("/lead/create", LeadController.createLeadAPI);
router.patch("/lead/update/:id", LeadController.updateLeadAPI);
router.get("/lead/read/:id", LeadController.readLeadAPI);
router.delete("/lead/delete/:id", LeadController.deleteLeadAPI);
router.patch("/lead/status/:id", LeadController.updateLeadStatusAPI);

// Account routes
router.get("/account/list", AccountController.listAccountView);
router.post("/account/create", AccountController.createAccountAPI);
router.patch("/account/update/:id", AccountController.updateAccountAPI);
router.get("/account/read/:id", AccountController.readAccountAPI);
router.delete("/account/delete/:id", AccountController.deleteAccountAPI);
router.patch("/account/status/:id", AccountController.updateAccountStatusAPI);

module.exports = router;
