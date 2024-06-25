import { DataTypes, Model } from "sequelize";
import connectionDb from "../connection/connectionDb.js";

class Doctores extends Model{}

Doctores.init(
    {
        id_doctor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_doctor: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        apellido_doctor: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        especialidad: {
            type: DataTypes.ENUM('Cardiologo', 'Pediatra', 'Dermatologo', 'Podologo', 'Ortopedia'),
            allowNull: false
        }
    },
    {
        sequelize: connectionDb,
        modelName: "Doctores",
        tableName: "doctores"
    }
);

export default Doctores;
