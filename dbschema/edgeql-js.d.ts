// path: /edgeql-js.d.ts

import {
    AgentType,
    AnalyticsType,
    FetchedTweetType,
    TwineetType,
    VerificationResponseType,
    UserTokenShareType,
    TokenShareType,
    TokenStatsType,
    TransactionType,
    CryptoHoldingType,
    DailyImpressionsType,
    PeakHoursType,
    ReachByPlatformType,
    TopInteractionsType,
    DemographicsType,
    AgentStatsType,
} from '@/dbschema/interfaces'; // Import the generated interfaces

export declare module '@/dbschema/edgeql-js' {
    interface EdgeQL {

        // Custom for method
        for<T>(
            collection: T[],
            callback: (item: T) => Promise<{ run: (client: EdgeDBClient) => Promise<void> }>
        ): Promise<void>;

        // Custom insert method for various types
        insert<T>(
            type: T,
            data: 
            T extends AgentType ? AgentType :
            T extends AnalyticsType ? AnalyticsType :
            T extends FetchedTweetType ? FetchedTweetType :
            T extends TwineetType ? TwineetType :
            T extends VerificationResponseType ? VerificationResponseType :
            T extends UserTokenShareType ? UserTokenShareType :
            T extends TokenShareType ? TokenShareType :
            T extends TokenStatsType ? TokenStatsType :
            T extends TransactionType ? TransactionType :
            T extends CryptoHoldingType ? CryptoHoldingType :
            T extends DailyImpressionsType ? DailyImpressionsType :
            T extends PeakHoursType ? PeakHoursType :
            T extends ReachByPlatformType ? ReachByPlatformType :
            T extends TopInteractionsType ? TopInteractionsType :
            T extends DemographicsType ? DemographicsType :
            T extends AgentStatsType ? AgentStatsType :
            never,
        ): Promise<{ run: (client: EdgeDBClient) => Promise<void> }>;
        array(arg0: Promise<{ run: (client: EdgeDBClient) => Promise<void>; }>[]): unknown;
        set(): unknown;
        set(arg0: 
            | Promise<{ run: (client: EdgeDBClient) => Promise<void>; }>
            | Promise<{ run: (client: EdgeDBClient) => Promise<void>; }>[]
            ): unknown;
       // spread<T>(...items: T[]): Promise<{ run: (client: EdgeDBClient) => Promise<void> }>;
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