const { Router } = require('express');
const { getRecipe } = require('../controller/controllerRecipe')
const { getDietsDB } = require('../controller/controllerDiets')
const { getDetailRecipe } = require('../controller/controllerIdRecipe')
const { postNewRecipe } = require('../controller/controllerPostsRecipe')



const router = Router();

router.get("/recipe", getRecipe);
router.get("/diets", getDietsDB);
router.get("/recipe/:idRecipe", getDetailRecipe);
router.post("/recipe", postNewRecipe);

module.exports = router;
 