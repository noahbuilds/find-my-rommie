import { IUser } from '../datasource/interfaces/user';
import { UserService } from './user.service';
import { injectable } from 'tsyringe';

@injectable()
class MatchService {
    usersToMatch?: IUser[];
    totalScore: number = 0;
    attributes: Array<string> = ['age', 'location', 'interests', 'state'];
    constructor(private readonly userService: UserService) {
        this.getUsers();
        console.log(this.usersToMatch);
    }

    public getUsers = async () => {
        this.usersToMatch = await this.userService.getUsers();
    };
    public findMatch = async (userId: string) => {
        const currentUserProfile = await this.userService.findOne(userId);
        const attributes = ['age', 'location', 'interests', 'education'];

        attributes.forEach((attr) => {
            if (attr === 'age') {
                const ageDiff = Math.abs(
                    currentUserProfile!.age - this.usersToMatch![1].age
                );
                if (ageDiff < 3) {
                    this.totalScore += 10;
                } else if (ageDiff < 5) {
                    this.totalScore += 5;
                } else {
                    this.totalScore += 1;
                }
            } else if (attr === 'location') {
                if (
                    currentUserProfile!.location ===
                    this.usersToMatch![1].location
                ) {
                    this.totalScore += 10;
                } else {
                    this.totalScore += 1;
                }
            } else if (attr === 'interests') {
                const sharedInterests = currentUserProfile!.interests.filter(
                    (interest) =>
                        this.usersToMatch![1].interests.includes(interest)
                );
                const interestScore =
                    sharedInterests.length /
                    Math.max(
                        currentUserProfile!.interests.length,
                        this.usersToMatch![1].interests.length
                    );
                this.totalScore += Math.round(interestScore * 10);
            } else if (attr === 'state') {
                if (
                    currentUserProfile!.stateOfOrigin ===
                    this.usersToMatch![1].stateOfOrigin
                ) {
                    this.totalScore += 10;
                } else {
                    this.totalScore += 1;
                }
            }
        });

        return {
            msg: `${currentUserProfile?.firstName} and ${
                this.usersToMatch![1].firstName
            } compatibility score is ${this.totalScore}/40`,
        };
    };

    public resetTotalScore = () => {
        this.totalScore = 0;
    };
}

export { MatchService };
// Output the total score
// console.log(`The total compatibility score is ${totalScore}/40`);
