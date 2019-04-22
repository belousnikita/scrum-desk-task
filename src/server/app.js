import express from "express";
import bodyParser from "body-parser";
import * as dataBase from "../server/utils/DatabaseUtils";
import cors from 'cors';
import { serverPort } from "../etc/config.json";

dataBase.setUpConnection();

const app = express();

app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));


app.get("/columns", (request, response) => {
  dataBase.listColumns().then(data => response.send(data));
});


app.post("/columns", (request, response) => {
  switch (request.body.type) {
    case "column": {
      dataBase.createColumn(request.body).then(data => response.send(data));
      return;
    }
    case "task": {
      dataBase.addTask(request.body.id, request.body).then(data => response.send(data));
      return;
    }
    default: return;
  }

});

app.delete("/columns/:id", (request, response) => {
  dataBase.deleteColumn(request.params.id).then(data => response.send(data));
});

const server = app.listen(serverPort, () =>
  console.log(`Server is up and running on port ${serverPort}`)
);
