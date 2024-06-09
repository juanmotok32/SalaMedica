import { Router } from "express";
import PacienteController from "../Controllers/PacienteController.js";

const paciente = new PacienteController();

const pacienteRoutes = Router();

// Ruta para obtener todos los usuarios
pacienteRoutes.get("/", paciente.readAllPacientes);

// Ruta para obtener un usuario por ID
pacienteRoutes.get("/:id", paciente.readPacienteById);

// Ruta para agregar un nuevo usuario
pacienteRoutes.post("/", paciente.createPaciente);

// Ruta para actualizar un usuario por ID
pacienteRoutes.put("/:idUsuario", paciente.editarPaciente);

// Ruta para eliminar un usuario por ID
pacienteRoutes.delete("/:id", paciente.eliminarPaciente);

export default pacienteRoutes;