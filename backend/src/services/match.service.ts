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

    public getUsersExceptCurrentUser = async (id: string): Promise<void> => {
        this.usersToMatch = (await this.userService.getUsersExceptOne(
            id
        )) as [];
        // console.log(this.usersToMatch);
    };
    public processMatch = async (userId: string, attributes: string[]) => {
        await this.getUsersExceptCurrentUser(userId);

        const currentUserProfile = await this.userService.findOne(userId);
        // const attributes = ['age', 'location', 'interests', 'state'];
        let startFrom = 0;
        let endAt = 250;
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

    public getNumberOfDataProcessed = (
        startFrom: number,
        endAt: number
    ): void => {
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
    ): void {
        for (let i = startFrom; i < endAt!; i++) {
            attributes.forEach((attr) => {
                switch (attr) {
                    case 'age':
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
                        break;
                    case 'male':
                        if (this.usersToMatch![i].gender === 'male') {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                    case 'female':
                        if (this.usersToMatch![i].gender === 'female') {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                    case 'interests':
                        const sharedInterests =
                            currentUserProfile!.interests.filter(
                                (interest: any) =>
                                    this.usersToMatch![i].interests.includes(
                                        interest
                                    )
                            );
                        const interestScore =
                            sharedInterests.length /
                            Math.max(
                                currentUserProfile!.interests.length,
                                this.usersToMatch![i].interests.length
                            );
                        this.totalScore += Math.round(interestScore * 10);
                        break;

                    case 'country':
                        if (
                            currentUserProfile!.country ==
                            this.usersToMatch![i].country
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                        break;
                    case 'socailStats':
                        if (
                            currentUserProfile!.socialStats ==
                            this.usersToMatch![i].socialStats
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                        break;
                    case 'roomTemperature':
                        if (
                            currentUserProfile!.roomTemperature ==
                            this.usersToMatch![i].roomTemperature
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                        break;
                    case 'visitorTolerance':
                        if (
                            currentUserProfile!.visitorTolerance ==
                            this.usersToMatch![i].visitorTolerance
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                        break;
                    case 'course':
                        if (
                            currentUserProfile!.course ==
                            this.usersToMatch![i].course
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                        break;
                    case 'campusBudget':
                        if (
                            currentUserProfile!.campusBudget ==
                            this.usersToMatch![i].campusBudget
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                        break;
                    case 'campusPreference':
                        if (
                            currentUserProfile!.campusPreference ==
                            this.usersToMatch![i].campusPreference
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                    case 'sportChoice':
                        if (
                            currentUserProfile!.sportChoice ==
                            this.usersToMatch![i].sportChoice
                        ) {
                            this.totalScore += 10;
                        } else {
                            this.totalScore += 1;
                        }
                    default:
                        break;
                }
            });

            this.usersToMatch![i].compatibilityScore =
                ((this.totalScore / (attributes.length * 10)) * 100).toFixed(
                    2
                ) + '%';
            let {
                firstName,
                lastName,
                interests,
                level,
                age,
                stateOfOrigin,
                location,
                compatibilityScore,
                bio,
                email,
                visitorTolerance,
                roomTemperature,
                socialStats,
                campusPreference,
                campusBudget,
                image,
            } = this.usersToMatch![i];

            this.result.push({
                firstName,
                lastName,
                interests,
                level,
                age,
                stateOfOrigin,
                location,
                bio,
                compatibilityScore,
                email,
                visitorTolerance,
                roomTemperature,
                socialStats,
                campusPreference,
                campusBudget,
                image,
            });

            this.resetTotalScore();
        }
    }

    public resetTotalScore = (): void => {
        this.totalScore = 0;
    };

    public clearResult = (): void => {
        this.result = [];
    };

    public findRoommie = async (params: any) => {
        return await this.userService.findRoommie(params);
    };
}

export { MatchService };
