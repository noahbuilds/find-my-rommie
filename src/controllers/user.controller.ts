import { Response, Request } from 'express';
import { UserRepository } from '../datasource/repository';
import { MatchService, UserService } from '../services';
import { injectable } from 'tsyringe';

@injectable()
class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly matchService: MatchService
    ) {}
    public createUser = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            let result = await this.userService.createUser(req.body);
            res.send({
                msg: result,
            });
        } catch (error: any) {
            throw Error(error.message);
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        let result = await this.userService.getUsers();
        res.send({
            msg: result,
        });
    };

    public getUserById = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        let result = await this.userService.findOne(userId);
        res.send({
            msg: result,
        });
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            let result = await this.userService.findEmail(req.body.email);
            if (result) {
                return res.status(200).send({
                    msg: result,
                });
            }
            // console.log(req.body.email)
            else {
                return res.status(401).send({
                    msg: result,
                });
            }
        } catch (error) {
            throw error;
        }
    };

    public matchUser = async (req: Request, res: Response) => {
        try {
            let result = await this.matchService.processMatch(
                req.params.userId
            );

            res.json({
                msg: result,
                processed: this.matchService.processedData,
            });
            this.matchService.resetTotalScore();
            this.matchService.clearResult();
        } catch (error) {}
    };

    public matchSingleProfile = async (req: Request, res: Response) => {
        try {
            let result = await this.matchService.matchSingleProfile(
                req.params.userToMatchId,
                req.params.currentUserId
            );

            res.json({
                msg: result,
                processed: this.matchService.processedData,
            });
            this.matchService.resetTotalScore();
            this.matchService.clearResult();
        } catch (error) {}
    };

    public findRoommie = async (req: Request, res: Response) => {
        try {
            const result = await this.matchService.findRoommie(req.body);
            return res.status(200).json({
                msg: result,
            });
        } catch (error) {}
    };
}

export { UserController };
