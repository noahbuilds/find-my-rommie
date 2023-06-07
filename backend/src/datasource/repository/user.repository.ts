import { User } from '../models';
import { IUser } from '../interfaces/user';
import { injectable } from 'tsyringe';

@injectable()
class UserRepository {
    private readonly db = User;

    public async createUser(user: IUser): Promise<IUser> {
        return await this.db.create(user);
    }

    public async getUsers(): Promise<IUser[]> {
        return await this.db.find({});
    }

    public async getAllUsersExceptOne(id: string): Promise<IUser[] | null> {
        return await this.db.find({ _id: { $ne: id } });
    }

    public async findOne(params: string): Promise<IUser | null> {
        return await this.db.findOne({ _id: params });
    }

    public async findEmail(params: string): Promise<IUser | null> {
        return await this.db.findOne({ email: params });
    }
    public findRoommie = async (option: any): Promise<IUser[] | []> => {
        // console.log();

        const result = await this.db.find(option);
        // console.log(result);
        return result;
    };

    public updateProfile = async (
        userId: string,
        options: any
    ): Promise<IUser | null> => {
        const result = await this.db.findByIdAndUpdate(
            { _id: userId },
            options,
            {
                new: true,
            }
        );
        return result;
    };

    public delete = async (userId: string): Promise<IUser | null> => {
        const result = await this.db.findByIdAndDelete(userId);
        return result;
    };
}

export { UserRepository };
