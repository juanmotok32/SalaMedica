import connectionDb from "../connection/connectionDb.js";

class DoctorController {

    createDoctor = async (req, res) => {
        try {
            const { nombre_doctor, apellido_doctor, especialidad } = req.body;
            const opcionesEspecialidad = ['Cardiologo', 'Pediatra', 'Dermatologo', 'Podologo', 'Ortopedia'];
            if (!opcionesEspecialidad.includes(especialidad)) {
                throw new Error('La especialidad especificada no es válida.');
            }
            const query = "INSERT INTO doctores (nombre_doctor, apellido_doctor, especialidad) VALUES (?, ?, ?)";
            const [result] = await connectionDb.query(query, [nombre_doctor, apellido_doctor, especialidad]);
            res.status(200).send({ success: true, message: "Doctor creado exitosamente", data: result });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
    
    eliminarDoctor = async (req, res) => {
        try {
            const { id } = req.params;
            const query = "DELETE FROM doctores WHERE id_doctor = ?";
            const [result] = await connectionDb.query(query, [id]);
            if (result.affectedRows > 0) {
                res.status(200).send({ success: true, message: `Doctor con id: ${id} eliminado correctamente` });
            } else {
                res.status(404).send({ success: false, message: "Doctor no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    readAllDoctores = async (req, res) => {
        try {
            const query = "SELECT * FROM doctores";
            const [result] = await connectionDb.query(query);
            res.status(200).send({ success: true, data: result });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    readDoctorById = async (req, res) => {
        try {
            const { id } = req.params;
            const query = "SELECT * FROM doctores WHERE id_doctor = ?";
            const [result] = await connectionDb.query(query, [id]);
            if (result.length > 0) {
                res.status(200).send({ success: true, data: result[0] });
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
            const { nombre_doctor, apellido_doctor, especialidad } = req.body;
            const query = "UPDATE doctores SET nombre_doctor = ?, apellido_doctor = ?, especialidad = ? WHERE id_doctor = ?";
            const [result] = await connectionDb.query(query, [nombre_doctor, apellido_doctor, especialidad, id]);
            if (result.affectedRows > 0) {
                res.status(200).send({ success: true, message: `Doctor con id: ${id} actualizado correctamente` });
            } else {
                res.status(404).send({ success: false, message: "Doctor no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
}

export default DoctorController;
