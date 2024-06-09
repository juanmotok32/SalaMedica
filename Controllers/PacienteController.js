import Paciente from "../routes/Models/Pacientes.js";

class PacienteController {

    createPaciente = async (req, res) => {
        try {
            const { name, mail, password } = req.body;
            const data = await Paciente.create({ name, mail, password });
            res.status(201).send({ success: true, message: `Paciente : ${data.name} fue creado con exito :D` });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
    eliminarPaciente = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Paciente.destroy({
                where: { id }
            });
            if (data) {
                res.status(200).send({ success: true, message: `Paciente con id: ${id} fue eliminado` });
            } else {
                res.status(404).send({ success: false, message: "Paciente no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    readAllPacientes = async (req, res) => {
        try {
            const data = await Paciente.findAll({
                attributes: ['name', 'mail']
            });
            res.status(200).send({ success: true, data });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    readPacienteById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Paciente.findOne({
                attributes: ["name", "mail"],
                where: { id }
            });
            if (data) {
                res.status(200).send({ success: true, data });
            } else {
                res.status(404).send({ success: false, message: "Paciente no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    editarPaciente = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, mail, password } = req.body;
            const [updated] = await Paciente.update({ name, mail, password }, {
                where: { id }
            });
            if (updated) {
                const updatedPaciente = await Paciente.findOne({ where: { id }, attributes: ["name", "mail"] });
                res.status(200).send({ success: true, message: `Paciente con id: ${id} fue actualizado con exito`, data: updatedPaciente });
            } else {
                res.status(404).send({ success: false, message: "Paciente no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
}

export default PacienteController;
