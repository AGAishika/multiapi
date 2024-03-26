const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const ProductController = require("../controllers/ProductController");
const RegisterController = require("../controllers/RegisterController");
const checkAuth = require("../middleware/auth");
const router = express.Router();

router.get("/testcategory", CategoryController.testcategory);
router.post("/categoryinsert", CategoryController.categoryinsert);
router.get("/categorydisplay", CategoryController.categorydisplay);
router.get("/categoryview/:id", CategoryController.categoryview);
router.put("/categoryupdate/:id", CategoryController.categoryupdate);
router.delete("/categorydelete/:id", CategoryController.categorydelete);
// product routing
router.get("/testproduct", ProductController.testproduct);
router.post("/productinsert", ProductController.productinsert);
router.get("/getallproduct", ProductController.getallproduct);
router.put("/updateproductdata/:id", ProductController.updateproductdata);
router.get("/getoneproduct/:id", ProductController.getoneproduct);
router.delete("/productdelete/:id", ProductController.productdelete);

//Registration Routing
router.post("/userinsert", RegisterController.userInsert);
router.post("/userlogin", RegisterController.userLogin);
router.get("/getuserdetail",checkAuth,RegisterController.getuserdetail);
module.exports = router;
