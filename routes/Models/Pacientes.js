import { DataTypes,Model } from "sequelize";
import connectionDb from "../../connection/connectionDb.js";

class Paciente extends Model{}

Paciente.init(
    {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize:connectionDb,
    modelName: "Pacientes",
    tableName:"Paciente"
});

export default Paciente;