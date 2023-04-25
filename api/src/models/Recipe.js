const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
/*ID. *
Nombre. *
Imagen. *
Resumen del plato. *
Nivel de comida saludable (health score). *
Paso a paso. * */
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/ehhmf8h7yetjefseyln1.jpg'
    }
  },
  {
    timestamps: false,
  });
};
