import { Response, Request } from 'express';
import { UserRepository } from '../datasource/repository';
import { UserService } from '../services';
import {injectable} from 'tsyringe'

@injectable()
class UserController {
    constructor(private readonly userService: UserService) {}
    public createUser = async (req: Request, res: Response) => {
        try {
            let result = await this.userService.createUser(req.body);
            res.send({
                msg: result,
            });
        } catch (error: any) {
            throw error(error.message);
        }
    };

    public getUsers = async (req: Request, res: Response) => {
        let result = await this.userService.getUsers();
        res.send({
            msg: result,
        });
    };
}

export { UserController };
