import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log(dotenv.config({ path: path.join(__dirname, '../../.env') + "i am here" }));


const configuration = {
    ENV_PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default configuration;
