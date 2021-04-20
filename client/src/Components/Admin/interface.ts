export interface team {
    _id: string;
    teamName: string;
    score: number;
    hints: { type1: number; type2: number; type3: number };
    leader: {
        name: string;
        email: string;
        number: string;
    };
    ques: number;
    members: { name: string; number: string; email: number }[];
    logs: [any];
    set: string;
    joinCode: string;
}