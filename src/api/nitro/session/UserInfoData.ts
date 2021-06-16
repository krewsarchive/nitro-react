export class UserInfoData
{
    public static OWN_USER: string = 'UID_OWN_USER';
    public static PEER: string = 'UID_PEER';
    public static BOT: string = 'UID_BOT';

    constructor(
        public type: string,
        public name: string = '',
        public motto: string = '',
        public achievementScore: number = 0,
        public webID: number = 0,
        public xp: number = 0,
        public userType: number = -1,
        public figure: string = '',
        public badges: string[] = [],
        public groupId: number = 0,
        public groupName: string = '',
        public groupBadgeId: string = '',
        public carryItem: number = 0,
        public userRoomId: number = 0,
        public isSpectatorMode: boolean = false,
        public realName: string = '',
        public allowNameChange: boolean = false,
        public amIOwner: boolean = false,
        public amIAnyRoomController: boolean = false,
        public roomControllerLevel: number = 0,
        public canBeAskedAsFriend: boolean = false,
        public canBeKicked: boolean = false,
        public canBeBanned: boolean = false,
        public canBeMuted: boolean = false,
        public respectLeft: number = 0,
        public isIgnored: boolean = false,
        public isGuildRoom: boolean = false,
        public canTrade: boolean = false,
        public canTradeReason: number = 0,
        public targetRoomControllerLevel: number = 0,
        public isFriend: boolean = false,
        public isAmbassador: boolean = false) {}
}