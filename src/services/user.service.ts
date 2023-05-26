import { IUser } from '../datasource/interfaces/user';
import { UserRepository } from '../datasource/repository';
import { injectable } from 'tsyringe';

@injectable()
class UserService {
    // private userRepository = new UserRepository();
    constructor(private readonly userRepository: UserRepository) {}
    public createUser = async (reqBody: IUser): Promise<IUser> => {
        return await this.userRepository.createUser(reqBody);
    };
    public getUsers = async (): Promise<IUser[]> => {
        return await this.userRepository.getUsers();
    };
    public findOne = async (params: string): Promise<IUser | null> => {
        return await this.userRepository.findOne(params);
    };
    public findEmail = async (params: string): Promise<IUser | null> => {
        return await this.userRepository.findEmail(params);
    };
    public findRoommie = async (option: any): Promise<IUser[] | []> => {
        const result = await this.userRepository.findRoommie(option);
        return result;
    };
}

export { UserService };
