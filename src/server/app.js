import express from "express";
import bodyParser from "body-parser";
import * as dataBase from "../server/utils/DatabaseUtils";

import { serverPort } from "../etc/config.json";

dataBase.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.get("/columns", (request, response) => {
  dataBase.listColumns().then(data => response.send(data));
});

app.post("/columns", (request, response) => {
  dataBase.createColumn(request.body).then(data => response.send(data));
});

app.delete("/columns/:id", (request, response) => {
  dataBase.deleteColumn(request.params.id).then(data => response.send(data));
});

const server = app.listen(serverPort, () =>
  console.log(`Server is up and running on port ${serverPort}`)
);
