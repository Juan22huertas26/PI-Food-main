const { DataTypes } = require('sequelize');

// ID. *
// Nombre. *


module.exports = (sequelize) => {
    sequelize.define('diet', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        } 
    },
    {
        timestamps: false
    })   
}