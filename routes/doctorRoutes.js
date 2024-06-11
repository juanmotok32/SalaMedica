import { Router } from "express";
import DoctorController from "../Controllers/DoctorController.js";

const doctor = new DoctorController();

const doctorRoutes = Router();

// Ruta para obtener todos los usuarios
doctorRoutes.get("/", doctor.readAllDoctores);

// Ruta para obtener un usuario por ID
doctorRoutes.get("/:id", doctor.readDoctorById);

// Ruta para agregar un nuevo usuario
doctorRoutes.post("/", doctor.createDoctor);

// Ruta para actualizar un usuario por ID
doctorRoutes.put("/", doctor.editarDoctor);

// Ruta para eliminar un usuario por ID
doctorRoutes.delete("/:id", doctor.eliminarDoctor);
/*
doctorRoutes.get("/pacientes/alta", doctor.getPacientesAlta);

doctorRoutes.put("/pacientes/:id_paciente/alta", doctor.updateAltaPaciente);
*/

export default doctorRoutes;