import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { userRouter } from './routes';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'

class App {
    public express: Application;
    public port: number;
    private mongoURI: string;

    constructor(port: number, mongoURI: string) {
        this.express = express();
        this.port = port;
        this.mongoURI = mongoURI;
        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeErrorHandling();
        this.initializeControllers();
    }

    private async initializeDatabaseConnection(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_URI!, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);
            return console.log(`Successfully connected to ${process.env.MONGO_URI!}`);
        } catch (error) {
            console.log('Error connecting to database: ', error);
            return process.exit(1);
        }
    }

    private initializeMiddleware(): void {
        // parse json request body
        this.express.use(express.json());

        // parse urlencoded request body
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(compression());
        this.express.use(cookieParser());
    }

    private initializeErrorHandling(): void {}

    private initializeControllers(): void {
        this.express.use('/api/v1/user', userRouter);
    }

    public startListener() {
        this.express.listen(this.port, () => {
            console.log(`App is running on PORT ${this.port}`);
        });
    }
}

export { App };
