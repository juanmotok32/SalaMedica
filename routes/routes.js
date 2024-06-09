import { Router } from "express";
import pacienteRoutes from "./pacienteRoutes.js"
import doctorRoutes from "./doctorRoutes.js"

const routes = Router();

routes.use("/pacientes" , pacienteRoutes);
routes.use("/doctores" , doctorRoutes);

export default routes;