const { Recipe, Diet } = require('../db')

const postNewRecipe = async (req, res) => {
    try {
      const { title, image, summary, healthScore, steps, diets } = req.body;
      
     // creo una nuevo receta con los valores obtenidos del body
      const post = await Recipe.create({
        title,
        image,
        summary,
        healthScore,
        steps,
      });

      const idDiets = await Diet.findAll({
        where: {name: diets}
      })
     // aqui utilizo en metodo addDiet para crear la asociacion
      await post.addDiet(idDiets)

      res.status(201).json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { postNewRecipe };
  