import Doctores from "../routes/Models/Doctores.js";
import connectionDb from "../connection/connectionDb.js";

class DoctorController {

    createDoctor = async (req, res) => {
        try {
            const query = "SELECT * FROM doctores";
            const [data] = await connectionDb.query(query);
            console.log('data: ' + data);
            res.status(200).send({ success: true, message: data });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
    eliminarDoctor = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Doctores.destroy({
                where: { id }
            });
            if (data) {
                res.status(200).send({ success: true, message: `Doctor con id: ${id} fue eliminado` });
            } else {
                res.status(404).send({ success: false, message: "Doctor no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    readAllDoctores = async (req, res) => {
        try {
            const data = await Doctores.findAll({
                attributes: ['nombre_doctor']
            });
            res.status(200).send({ success: true, data });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    readDoctorById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Doctores.findOne({
                attributes: ["name", "mail"],
                where: { id }
            });
            if (data) {
                res.status(200).send({ success: true, data });
            } else {
                res.status(404).send({ success: false, message: "Doctor no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    editarDoctor = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, mail, password } = req.body;
            const [updated] = await Doctores.update({ name, mail, password }, {
                where: { id }
            });
            if (updated) {
                const updatedDoctor = await Doctores.findOne({ where: { id }, attributes: ["name", "mail"] });
                res.status(200).send({ success: true, message: `Doctor con id: ${id} fue actualizado con exito`, data: updatedDoctor });
            } else {
                res.status(404).send({ success: false, message: "Doctor no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
}

export default DoctorController;
