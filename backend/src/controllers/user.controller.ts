import { Response, Request } from 'express';
import { UserRepository } from '../datasource/repository';
import {
    MatchService,
    TokenService,
    UserService,
    AuthService,
    ImageService,
} from '../services';
import { injectable } from 'tsyringe';
import { IUser } from '../datasource/interfaces/user';

@injectable()
class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly matchService: MatchService,
        private readonly tokenService: TokenService,
        private readonly authService: AuthService,
        private readonly imageService: ImageService
    ) {}
    public createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, gender, age } = req.body;
        if (!(email && password && firstName && lastName && gender && age)) {
            return res.status(400).send({ msg: 'All input is required' });
        }
        try {
            const foundEmail = await this.userService.findEmail(req.body.email);
            if (foundEmail) {
                return res.status(409).send({
                    msg: 'Email already exits',
                });
            }

            const result = await this.userService.createUser(req.body);
            return res.status(201).send({
                msg: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                error,
            });
            // throw Error(error.message);
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.getUsers();
            return res.status(200).send({
                msg: result,
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    public getUserById = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        try {
            const result = await this.userService.findOne(userId);
            return res.status(200).send({
                msg: result,
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send({ msg: 'All input is required' });
        } else {
            try {
                const result = await this.authService.loginUser(req.body);
                if (result) {
                    const userToken = this.tokenService.assignToken(result);
                    res.set('auth-token', userToken);
                    // res.cookie('jwt', userToken, {
                    //     httpOnly: true,

                    //     secure: true,
                    //     sameSite: 'strict',
                    // });
                    // console.log(userToken)
                    return res.status(200).json(result);
                }

                return res.status(401).json({
                    msg: 'username or password is incorrect',
                    login: false,
                });
            } catch (error: any) {
                return res.status(500).json({
                    msg: ' Couldnt log  user in',
                    err: error.message,
                });
            }
        }
    };

    public updateProfile = async (req: any, res: Response) => {
        const userId = req.user.userId;
        // cannot update email and password from here
        delete req.body.password;
        delete req.body.email;
        // console.log(object);

        try {
            const data = await this.userService.updateProfile(userId, req.body);
            const {
                firstName,
                lastName,
                updatedAt,
                bio,
                course,
                genderinclusion,
                phoneNumber,
                roomTemperature,
                country,
                interests,
                sportChoice,
                socialStats,
            } = data as IUser;
            const result = {
                firstName,
                lastName,
                updatedAt,
                bio,
                course,
                country,
                genderinclusion,
                phoneNumber,
                roomTemperature,
                interests,
                socialStats,
                sportChoice,
            };
            return res.status(200).send({
                msg: result,
            });
        } catch (error) {
            return res.status(500);
        }
    };

    public matchUser = async (req: any, res: Response) => {
        console.log(req.user.userId);
        try {
            const result = await this.matchService.processMatch(
                req.user.userId,
                req.body.attributes
            );

            res.status(200).json({
                msg: result,
                processed: this.matchService.processedData,
            });
            this.matchService.resetTotalScore();
            this.matchService.clearResult();
        } catch (error) {
            return res.status(500).send({ msg: error });
        }
    };

    public findRoommie = async (req: Request, res: Response) => {
        try {
            const result = await this.matchService.findRoommie(req.body);
            return res.status(200).json({
                msg: result,
            });
        } catch (error) {
            return res.status(500).send({ msg: error });
        }
    };

    public getWhoIam = async (req: any, res: Response) => {
        try {
            const userId = req.user.userId;
            const data = await this.userService.findOne(userId);
            // console.log(result);

            const {
                firstName,
                lastName,
                updatedAt,
                bio,
                course,
                genderinclusion,
                phoneNumber,
                roomTemperature,
                country,
                interests,
                sportChoice,
                socialStats,
                _id,
                image,
                age,
                gender,
            } = data as IUser;
            const result = {
                _id,
                firstName,
                lastName,
                updatedAt,
                bio,
                course,
                country,
                genderinclusion,
                phoneNumber,
                roomTemperature,
                interests,
                socialStats,
                sportChoice,
                image,
                age,
                gender,
            };
            res.status(200).send({
                result,
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    public deleteUser = async (req: any, res: Response) => {
        try {
            const result = await this.userService.deleteUser(req.user.userId);
            return res
                .status(200)
                .send({ msg: 'Deleted successfully', user: result });
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    public uploadFile = async (req: any, res: Response) => {
        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
        if (!this.imageService.isFileValid(req))
            return res.status(400).send('File is not valid');
        try {
            const filePath = await this.imageService.initializeApp(req);
            const result = await this.userService.updateProfile(
                req.user.userId,
                { image: filePath }
            );

            res.status(200).send({
                result,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    };
}

export { UserController };
