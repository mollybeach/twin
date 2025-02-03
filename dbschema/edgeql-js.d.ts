// path: /edgeql-js.d.ts

import {
    AgentType,
    TwineetType,
    FetchedTweetType,
    TransactionType,
    VerificationResponseType,
    UserTokenShareType,
    TokenStatsType,
    TokenShareType,
    AnalyticsType,
    CryptoHoldingType,
    DailyImpressionsType,
    DemographicsType,
    PeakHoursType,
    ReachByPlatformType,
    TopInteractionsType,
} from '@/dbschema/interfaces'; // Import the generated interfaces

export declare module '@/dbschema/edgeql-js' {
    interface EdgeQL {
        query: (queryString: string) => Promise<unknown>;
        cast: (type: decimal.Decimal, value: number | Date) => number | Date;
        decimal: (value: decimal.Decimal) => decimal.Decimal;

        // Adjusted insert method to use specific types
        insert: (
            type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, 
            data: AgentType | TwineetType | FetchedTweetType | TransactionType | VerificationResponseType | UserTokenShareType | TokenStatsType | TokenShareType
        ) => Promise<{ run: (client: EdgeDBClient) => Promise<void> }>;

        // Adjusted update method to use specific types
        update: (
            type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, 
            data: AgentType | TwineetType | FetchedTweetType | TransactionType | VerificationResponseType | UserTokenShareType | TokenStatsType | TokenShareType
        ) => Promise<{ run: (client: EdgeDBClient) => Promise<void> }>;

        // Adjusted select method to return specific types
        select: (
            type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, 
            data: AgentType | TwineetType | FetchedTweetType | TransactionType | VerificationResponseType | UserTokenShareType | TokenStatsType | TokenShareType
        ) => Promise<AgentType[] | TwineetType[] | FetchedTweetType[] | TransactionType[] | VerificationResponseType[] | UserTokenShareType[] | TokenStatsType[] | TokenShareType[]>;

        op: (agentId: string, comparison: '=', otherAgentId: string) => Promise<void>;
        run: (data: object) => Promise<void>;
        filter: (data: object) => Promise<void>;
        datetime: (date: Date) => Promise<void>;

        // Add more methods and properties as needed
        Analytics: (data: AnalyticsType) => Promise<void>;
        CryptoHolding: (data: CryptoHoldingType) => Promise<void>;
        Demographics: (data: DemographicsType) => Promise<void>;
        DailyImpressions: (data: DailyImpressionsType) => Promise<void>;
        PeakHours: (data: PeakHoursType) => Promise<void>;
        ReachByPlatform: (data: ReachByPlatformType) => Promise<void>;
        TopInteractions: (data: TopInteractionsType) => Promise<void>;
        FetchedTweet: (data: FetchedTweetType) => Promise<void>;
        Twineet: (agentId: string, data: TwineetType) => Promise<void>;
        Transaction: (data: TransactionType) => Promise<void>;
        Agent: (data: AgentType) => Promise<void>;
        AgentStats: (data: AgentStatsType) => Promise<void>;
        Verification: (data: VerificationResponseType) => Promise<void>;
        UserTokenShare: (data: UserTokenShareType) => Promise<void>;
        TokenStats: (data: TokenStatsType) => Promise<void>;
        TokenShare: (data: TokenShareType) => Promise<void>;
    }

    const edgeql: EdgeQL;
    export default edgeql;
}