const express = require("express");
const router = express.Router();

const sauceControler = require("../controllers/sauces");

router.post("/", sauceControler.createSauce);
router.get("/", sauceControler.getAllSauces);
router.get("/:id", sauceControler.getOneSauce);
router.put("/:id", sauceControler.modifySauce);
router.delete("/:id", sauceControler.deleteSauce);
router.post("/:id/like");

module.exports = router;
