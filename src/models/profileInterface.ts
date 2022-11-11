export interface ProfileInfo {
    userId: number;
    name: string;
    nickname: string;
    lastname: string;
    fullname: string;
    age: string;
    sports: Array<string>;
    skateboardingstatistics: {
        competitions: string;
        wins: string;
        losses: string;
    };
    skateboardingresults:
        {
            resultId: number;
            competition: string;
            winner: string;
            placement: string;
            date: string;
            participants: Array<string>;
        }[];
    counterstrikestatistics: {
        matches: string;
        wins: string;
        losses: string;
    };
    counterstrikeresults: 
        {
            resultId: number;
            match: string;
            status: string;
            date: string;
            redteam: Array<string>;
            blueteam: Array<string>;
        }[];
};