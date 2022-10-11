const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        validateHeightMin(value){
          if(value < 23){
            throw new Error(`No es correcto el valor de ${value}`);
          }
        }
      }
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        validateHeightMax(value){
          if(value > 29){
            throw new Error(`No es correcto el valor de ${value}`);
          }
        }
      }
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        validateWeightMin(value){
          if(value < 3){
            throw new Error(`No es correcto el valor de ${value}`);
          }
        }
      }
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        validateWeightMax(value){
          if(value > 6){
            throw new Error(`No es correcto el valor de ${value}`);
          }
        }
      }
    },
    life_span: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
