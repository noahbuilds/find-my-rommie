import configuration from './configs/configs';
import { App } from './app';

const app = new App(
    Number(configuration.appConfig.ENV_PORT),
    configuration.appConfig.MONGO_URI!
);
app.startListener();
