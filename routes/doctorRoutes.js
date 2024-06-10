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
doctorRoutes.put("/:idUsuario", doctor.editarDoctor);

// Ruta para eliminar un usuario por ID
doctorRoutes.delete("/:id", doctor.eliminarDoctor);

export default doctorRoutes;