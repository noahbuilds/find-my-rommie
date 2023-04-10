import { IUser } from '../datasource/interfaces/user';
import { UserService } from './user.service';
import { injectable } from 'tsyringe';

@injectable()
class MatchService {
    usersToMatch?: IUser[];
    totalScore: number = 0;
    attributes: Array<string> = ['age', 'location', 'interests', 'state'];
    result: any = [];
    processedData: string = '';

    constructor(private readonly userService: UserService) {}

    public getUsers = async () => {
        this.usersToMatch = await this.userService.getUsers();
    };
    public processMatch = async (userId: string) => {
        await this.getUsers();

        const currentUserProfile = await this.userService.findOne(userId);
        const attributes = ['age', 'location', 'interests', 'state'];
        let startFrom = 0;
        let endAt = 30;
        if (!(endAt > this.usersToMatch!.length)) {
            this.matcher(currentUserProfile!, attributes, startFrom, endAt);
        } else {
            let startFrom = 0;
            let endAt = this.usersToMatch?.length;
            this.matcher(currentUserProfile!, attributes, startFrom, endAt);
        }
        this.getNumberOfDataProcessed(startFrom, endAt);
        return this.result;
    };

    public getNumberOfDataProcessed = (startFrom: number, endAt: number) => {
        this.processedData = `processed data from ${startFrom} - ${endAt}`;
    };
    /**
     * name
     */

    public matcher(
        currentUserProfile: IUser,
        attributes: string[],
        startFrom: number,
        endAt: number | undefined
    ) {
        for (let i = startFrom; i < endAt!; i++) {
            attributes.forEach((attr) => {
                if (attr === 'age') {
                    const ageDiff = Math.abs(
                        currentUserProfile!.age - this.usersToMatch![i].age
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
                        this.usersToMatch![i].location
                    ) {
                        this.totalScore += 10;
                    } else {
                        this.totalScore += 1;
                    }
                } else if (attr === 'interests') {
                    const sharedInterests =
                        currentUserProfile!.interests.filter((interest: any) =>
                            this.usersToMatch![i].interests.includes(interest)
                        );
                    const interestScore =
                        sharedInterests.length /
                        Math.max(
                            currentUserProfile!.interests.length,
                            this.usersToMatch![i].interests.length
                        );
                    this.totalScore += Math.round(interestScore * 10);
                } else if (attr === 'state') {
                    if (
                        currentUserProfile!.stateOfOrigin ==
                        this.usersToMatch![i].stateOfOrigin
                    ) {
                        this.totalScore += 10;
                    } else {
                        this.totalScore += 1;
                    }
                }
            });

            this.usersToMatch![i].compatibilityScore = this.totalScore + '/40';
            let {
                firstName,
                lastName,
                interests,
                level,
                age,
                stateOfOrigin,
                location,
                compatibilityScore,
            } = this.usersToMatch![i];

            this.result.push({
                firstName,
                lastName,
                interests,
                level,
                age,
                stateOfOrigin,
                location,
                compatibilityScore,
            });

            this.resetTotalScore();
        }
    }

    public resetTotalScore = () => {
        this.totalScore = 0;
    };

    public clearResult = () => {
        this.result = [];
    };
}

export { MatchService };
