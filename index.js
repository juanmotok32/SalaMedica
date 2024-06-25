import express from "express";
import routes from "./routes/routes.js"
import connectionDb from "./connection/connectionDb.js";
import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');


const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));

app.get('/pacientes/agregar', function(req, res) {
  res.render('pacienteAgregar');
});

app.get('/doctores/agregar', function(req, res) {
  res.render('doctorAgregar');
});

app.get('/', function(req, res) {
  res.render('inicio');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/SM', routes);

await connectionDb.sync()

app.listen(8080, () => {
  console.log(`🚀 listen `);
});
