require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db')

//id | title | summary | healthScore | steps | image

const getDetailRecipe = async (req, res) => {
    try {
      const { idRecipe } = req.params;
      const regEx = /^[0-9]+$/; //verifico si el id es numerico
      let data; 
      if (regEx.test(idRecipe)) {
        //Si es numérico, busca la receta solicitada en la API
        const response = await axios(
          `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
        );
        // aqui guardo la respuesta de la api 
        const api = response.data;
        // en data guardo los resultados de la api
        data = {
          id: api.id,
          title: api.title,
          image: api.image,
          summary: api.summary,
          healthScore: api.healthScore,
          steps: api.instructions,
          diets: api.diets.map(diet => {
            return {
              name: diet
            }
          }),
        };
      } else {
        //aqui pregunto en mi bdd si esta la receta por id
        data = await Recipe.findOne({
          where: {
            id:idRecipe
          },
          // de mi modelo diet solo se debe incluir los nombre
          include: {
            model: Diet,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          }
        })
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  module.exports = { getDetailRecipe };