import { Sequelize } from "sequelize";

const connectionDb = new Sequelize('salamedicadb', "root", "12345",{
  host:"localhost",
  dialect: "mysql",
  port: 3306
})

export default connectionDb;
