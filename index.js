import express from "express";
import routes from "./routes/routes.js"

const app = express();

app.get('/', routes);

app.listen(8080, () => {
  console.log(`🚀 listen `);
});
