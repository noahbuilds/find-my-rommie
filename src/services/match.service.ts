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

    public getUsers = async (): Promise<void> => {
        this.usersToMatch = await this.userService.getUsers();
    };
    public getUser = async (id: string): Promise<void> => {
        const userToMatch = await this.userService.findOne(id);
        this.usersToMatch = [userToMatch!];
        // console.log(this.usersToMatch);
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

    public getNumberOfDataProcessed = (
        startFrom: number,
        endAt: number
    ): void => {
        this.processedData = `processed data from ${startFrom} - ${endAt}`;
    };
    /**
     * name
     */

    public matchSingleProfile = async (
        userToMatchId: string,
        currentUserId: string
    ) => {
        try {
            await this.getUser(userToMatchId);
            console.log(this.usersToMatch);
            const currentUserProfile = await this.userService.findOne(
                currentUserId
            );
            const attributes = [
                'age',
                'location',
                'interests',
                'state',
                'socialStats',
            ];
            let startFrom = 0;
            let endAt = 30;
            console.log(this.usersToMatch);
            if (!(endAt > this.usersToMatch!.length)) {
                this.matcher(currentUserProfile!, attributes, startFrom, endAt);
            } else {
                let startFrom = 0;
                let endAt = this.usersToMatch?.length;
                this.matcher(currentUserProfile!, attributes, startFrom, endAt);
            }
            this.getNumberOfDataProcessed(startFrom, endAt);
            console.log(this.result);
            return this.result;
        } catch (error) {
            console.log(error);
        }
    };

    public matcher(
        currentUserProfile: IUser,
        attributes: string[],
        startFrom: number,
        endAt: number | undefined
    ): void {
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
                } else if (attr === 'socialStats') {
                    if (
                        currentUserProfile!.socialStats ==
                        this.usersToMatch![i].socialStats
                    ) {
                        this.totalScore += 10;
                    } else {
                        this.totalScore += 1;
                    }
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
