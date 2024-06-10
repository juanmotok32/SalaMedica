import express from "express";
import routes from "./routes/routes.js"
import connectionDb from "./connection/connectionDb.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/salaMedica', routes);

await connectionDb.sync()

app.listen(8080, () => {
  console.log(`🚀 listen `);
});
