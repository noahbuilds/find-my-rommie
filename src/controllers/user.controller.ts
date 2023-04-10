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
}

export { UserController };
