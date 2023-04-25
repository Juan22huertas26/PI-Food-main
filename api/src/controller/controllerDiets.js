require('dotenv').config()
const axios = require('axios');
const { API_KEY, URL } = process.env;
const { Diet } = require('../db')


const getDiet = async() => {
    try {
        const dietas = [];
        const response = await axios(
            `${URL}?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
          );
          const {results} = response.data
          // aqui pregunto si en resultados existe la dieta vegetarian si es asi la guardo
          if(results[0].vegetarian){
              if(!dietas.includes('vegetarian'))dietas.push('vegetarian')
          }
         const diets = results.map(recipe => recipe.diets);
         //recorro el array completo y voy agregando las dietas que no tengo incluidas
        for(let i = 0; i < diets.length; i++){
            for(let j = 0; j < diets[i].length; j++){
                if(!dietas.includes(diets[i][j])){
                    dietas.push(diets[i][j])
                }
            }
        }
        // en esta instancia guardo todas todas dietas que tengo en el array en mi bdd
        await Diet.bulkCreate(dietas.map(diet => {
            return {
                name:diet
            }
        }), {ignoreDuplicates: true});
        console.log(dietas);
    } catch (error) {
       return (error.message)
    }
};

const getDietsDB = async (req, res) => {
    try {
        const dbRes = await Diet.findAll()
        res.status(200).json(dbRes)       
    } catch (error) {
        res.status(400).json({err: error.message})
    }
}
module.exports = { getDiet, getDietsDB };
