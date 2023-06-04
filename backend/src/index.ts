import configuration from './configs/configs';
import { App } from './app';

const app = new App(Number(configuration.ENV_PORT), configuration.MONGO_URI!);
app.startListener();
