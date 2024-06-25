import { DataTypes, Model } from "sequelize";
import connectionDb from "../../connection/connectionDb.js";
import Doctores from './Doctores.js'; 

class Pacientes extends Model{}

Pacientes.init(
    {
        id_paciente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        razon_asistencia: {
            type: DataTypes.ENUM('Cardiologo', 'Pediatra', 'Dermatologo', 'Podologo', 'Ortopedia'),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alta: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        id_doctor: {
            type: DataTypes.INTEGER,
            references: {
                model: Doctores,
                key: 'id_doctor'
            }
        }
    },
    {
        sequelize: connectionDb,
        modelName: "Pacientes",
        tableName: "pacientes"
    }
);

Doctores.hasMany(Pacientes, { foreignKey: 'id_doctor' });
Pacientes.belongsTo(Doctores, { foreignKey: 'id_doctor' });


export default Pacientes;