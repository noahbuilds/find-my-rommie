import { Response, Request } from 'express';
import { UserRepository } from '../datasource/repository';
import {
    MatchService,
    TokenService,
    UserService,
    AuthService,
} from '../services';
import { injectable } from 'tsyringe';

@injectable()
class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly matchService: MatchService,
        private readonly tokenService: TokenService,
        private readonly authService: AuthService
    ) {}
    public createUser = async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const foundEmail = await this.userService.findEmail(req.body.email);
            if (foundEmail) {
                return res.status(409).send({
                    msg: 'Email already exits',
                });
            }
            const result = await this.userService.createUser(req.body);
            res.status(201).send({
                msg: result,
            });
        } catch (error: any) {
            res.status(400).send({
                error,
            });
            // throw Error(error.message);
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        const result = await this.userService.getUsers();
        res.send({
            msg: result,
        });
    };

    public getUserById = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const result = await this.userService.findOne(userId);
        res.send({
            msg: result,
        });
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.loginUser(req.body);
            if (result) {
                const userToken = this.tokenService.assignToken(result);
                res.set('auth-token', userToken);
                // res.cookie('jwt', userToken, {
                //     httpOnly: true,
                //     expires: new Date(Date.now()),
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
    };

    public matchUser = async (req: any, res: Response) => {
        console.log(req.user.userId);
        try {
            const result = await this.matchService.processMatch(
                req.user.userId
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

    public matchSingleProfile = async (req: Request, res: Response) => {
        try {
            const result = await this.matchService.matchSingleProfile(
                req.params.userToMatchId,
                req.params.currentUserId
            );

            res.json({
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
}

export { UserController };
