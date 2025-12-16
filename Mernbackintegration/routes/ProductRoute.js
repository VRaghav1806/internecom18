const express = require("express")
const {getProduct,postProduct,deleteProduct,updateProduct} = require("../controller/productController")
const router = express.Router();
router.get("/products",getProduct)
router.post("/postProducts",postProduct)
router.delete("/deleteProducts/:id",deleteProduct)
router.put("/updateProducts/:id", updateProduct)

module.exports=router;