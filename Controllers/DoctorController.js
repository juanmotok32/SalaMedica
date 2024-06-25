import connectionDb from "../connection/connectionDb.js";

class DoctorController {

    createDoctor = async (req, res) => {
        try {
            const { nombre_doctor, apellido_doctor, especialidad } = req.body;
            const opcionesEspecialidad = ['Cardiologo', 'Pediatra', 'Dermatologo', 'Podologo', 'Ortopedia'];
            if (!opcionesEspecialidad.includes(especialidad)) {
                throw new Error('La especialidad especificada no es válida.');
            }
            const query = `INSERT INTO doctores (nombre_doctor, apellido_doctor, especialidad) VALUES ('${nombre_doctor}', '${apellido_doctor}', '${especialidad}')`;
            const [result] = await connectionDb.query(query, [nombre_doctor, apellido_doctor, especialidad]);
            res.status(200).send({ success: true, message: "Doctor creado exitosamente", data: result });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
    
    eliminarDoctor = async (req, res) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM doctores WHERE id_doctor = ${id}`;
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
            const query = `SELECT * FROM doctores WHERE id_doctor = ${id}`;
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
            const { nombre_doctor, apellido_doctor, especialidad,id_doctor  } = req.body;
            const query = `UPDATE doctores SET nombre_doctor = '${nombre_doctor}', apellido_doctor = '${apellido_doctor }', especialidad = '${especialidad}' WHERE id_doctor = ${id_doctor}`;
            const [result] = await connectionDb.query(query, [nombre_doctor, apellido_doctor, especialidad, id_doctor]);
            if (result.affectedRows > 0) {
                res.status(200).send({ success: true, message: `Doctor con id: ${id_doctor} actualizado correctamente` });
            } else {
                res.status(404).send({ success: false, message: "Doctor no encontrado" });
            }
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
    darAlta = async(req,res) =>{
        try{
            const { id } = req.body;
            const query = `UPDATE pacientes SET alta = 1 WHERE id_paciente = ${id}`;
            const [result] = await connectionDb.query(query);
            if (result.affectedRows > 0) {
                res.status(200).send({ success: true, message: `Paciente con id: ${id} fue actualizado correctamente` });
            } else {
                res.status(404).send({ success: false, message: "Paciente no encontrado" });
            }
        }catch(error){
            res.status(400).send({ success: false, message: error.message });
        }
    }
    
    pacientesAlta = async(req, res)=>{
        try{
            const query = "SELECT * FROM pacientes WHERE alta = 1";
            const [result] = await connectionDb.query(query);
            res.status(200).send({ success: true, data: result });
        }catch(error){
            res.status(400).send({ success: false, message: error.message });
        }
    }
}



export default DoctorController;
