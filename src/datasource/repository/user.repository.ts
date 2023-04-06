import { User } from '../models';
import { IUser } from '../interfaces/user';
import {injectable} from 'tsyringe'


@injectable()
class UserRepository {
    private readonly db = User;

    async createUser(user: IUser) {
        return await this.db.create(user);
    }

    async getUsers() {
        return await this.db.find({});
    }

    async findOne(params: string){
        return await this.db.findOne({params})
    }
}

export { UserRepository };
