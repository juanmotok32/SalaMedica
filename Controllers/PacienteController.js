import connectionDb from "../connection/connectionDb.js";

class PacienteController {

    createPaciente = async (req, res) => {
        try {
            const { razon_asistencia, nombre, apellido, edad } = req.body;
            const opcionesRazonAsistencia = ['Cardiologo', 'Pediatra', 'Dermatologo', 'Podologo', 'Ortopedia'];
            if (!opcionesRazonAsistencia.includes(razon_asistencia)) {
                throw new Error('La razón de asistencia especificada no es válida.');
            }
            const doctorQuery = "SELECT id_doctor FROM doctores WHERE especialidad = ? LIMIT 1";
            const [doctorResult] = await connectionDb.query(doctorQuery, [razon_asistencia]);
            if (!doctorResult || doctorResult.length === 0) {
                throw new Error('No se encontró un doctor para la especialidad especificada.');
            }
            const id_doctor = doctorResult[0].id_doctor;
            const pacienteQuery = "INSERT INTO pacientes (razon_asistencia, nombre, apellido, edad, alta, id_doctor) VALUES (?, ?, ?, ?, false, ?)";
            const [result] = await connectionDb.query(pacienteQuery, [razon_asistencia, nombre, apellido, edad, id_doctor]);

            res.status(200).send({ success: true, message: "Paciente creado exitosamente", data: result });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
    eliminarPaciente = async (req, res) => {
        try {
            const { id } = req.params;
            const query = "DELETE FROM pacientes WHERE id_paciente = ?";
            const [result] = await connectionDb.query(query, [id]);
            if (result.affectedRows > 0) {
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
            const query = "SELECT * FROM pacientes";
            const [result] = await connectionDb.query(query);
            res.status(200).send({ success: true, data: result });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }

    readPacienteById = async (req, res) => {
        try {
            const { id } = req.params;
            console.log(`Querying paciente with id: ${id}`); // Log de depuración
            const query = `SELECT nombre, apellido, edad, alta FROM pacientes WHERE id_paciente = ${id}`;
            const [result] = await connectionDb.query(query, [id]);
            if (result.length > 0) {
                res.status(200).send({ success: true, data: result[0] });
            } else {
                res.status(404).send({ success: false, message: "Paciente no encontrado" });
            }
        } catch (error) {
            console.error(`Error querying paciente by id: ${error.message}`); 
            res.status(400).send({ success: false, message: error.message });
        }
    }


    editarPaciente = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, edad, alta } = req.body;
            const query = "UPDATE pacientes SET nombre = ?, apellido = ?, edad = ?, alta = ? WHERE id_paciente = ?";
            const [result] = await connectionDb.query(query, [nombre, apellido, edad, alta, id]);
            if (result.affectedRows > 0) {
                const updatedPaciente = { id, nombre, apellido, edad, alta };
                res.status(200).send({ success: true, message: `Paciente con id: ${id} fue actualizado correctamente`, data: updatedPaciente });
            } else {
                res.status(404).send({ success: false, message: "Paciente no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
}

export default PacienteController;
