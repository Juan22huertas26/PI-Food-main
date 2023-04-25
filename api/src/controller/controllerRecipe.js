const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL } = process.env;

const getRecipe = async (req, res) => {
  try {
    const response = await axios(
      `${URL}?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
    );
    const { name } = req.query;
    const {results} = response.data;
    const apiRecipe = results.map(rec => { //aqui solo pido los datos necesarios para guardarlos en el array

      return {
        id: rec.id,
        title: rec.title,
        image: rec.image,
        summary: rec.summary,
        healthScore: rec.healthScore,
        steps: rec.analyzedInstructions[0] ? rec.analyzedInstructions[0].steps.map(s => s.step).join(' ') : '',
        //como no todas las recetas tienen las instrucciones con el ternario si no llegase a existir se devuelve una cadena vacia
        diets: rec.diets
      }
    })
    const dbRecipe = await Recipe.findAll({ 
        include: {
        model: Diet,
      }
    }).then(data => data.map(rec => { // con esta consulta a la base de datos devuelvo un array de objetos con todas las recetas obtenidas
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image,
        summary: rec.summary,
        healthScore: rec.healthScore,
        steps: rec.steps,
        diets: rec.diets.map(diet => diet.name)  // aqui devuelvo un array con solo los nombres de las dietas
      }
    }))

    // en este nuevo array guardo todas las recetas recetas tanto de la api como de la bdd
    const finalArray = apiRecipe.concat(dbRecipe); 
    
    if (name) { 
      // filtra por query todas las recetas que incluyan el nombre (no distingue minusculas de mayusculas)
      const filtered = finalArray.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );
      res.status(200).json(filtered);
    } else {
      res.status(200).json(finalArray);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRecipe };