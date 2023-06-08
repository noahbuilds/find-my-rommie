import * as dotenv from 'dotenv';

dotenv.config();

export default {
    fireBaseConfig: {
        apiKey: process.env.fireBaseApiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId,
    },
};
