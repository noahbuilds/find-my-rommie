import express, { Application, Request, Response }  from "express";
import mongoose, { ConnectOptions } from "mongoose";
import configuration from "./configs/configs";

const app: Application = express()


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


(async function () {
    try {
      await mongoose.connect(configuration.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions);
      return console.log(`Successfully connected to ${configuration.MONGO_URI}`);
    } catch (error:any) {
      console.log("Error connecting to database: ", error);
      return process.exit(1);
    }
  })();

app.listen(configuration.ENV_PORT, () => {
    console.log(`App is running on PORT ${configuration.ENV_PORT}`);
  });