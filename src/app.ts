import express, { Application, Request, Response }  from "express";
import configuration from "./configs/configs";

const app: Application = express()


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));



app.listen(configuration.ENV_PORT, () => {
    console.log(`App is running on PORT ${configuration.ENV_PORT}`);
  });