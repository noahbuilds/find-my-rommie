import { ILogin, IUser } from '../datasource/interfaces/user';
import { UserService, TokenService } from './index';
import bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';

@injectable()
class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}
    public loginUser = async (reqBody: ILogin): Promise<IUser | any> => {
        const { email, password } = reqBody;
        let foundUser = await this.userService.findEmail(email);

        if (foundUser != null) {
            let passwordMatch = await bcrypt.compare(
                password,
                foundUser?.password
            );
            if (passwordMatch) {
                return this.tokenService.assignToken(foundUser);
                return foundUser;
            }
        }
        return null;
    };

    public logoutUser = async () => {};
}

export { AuthService };
