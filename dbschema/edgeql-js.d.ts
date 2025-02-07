// path: /edgeql-js.d.ts

import {
    TwinType,
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
    TwinStatsType,
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
            T extends TwinType ? TwinType :
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
            T extends TwinStatsType ? TwinStatsType :
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
            type: EdgeQL.Twin | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, 
            data: TwinType | TwineetType | FetchedTweetType | TransactionType | VerificationResponseType | UserTokenShareType | TokenStatsType | TokenShareType
        ) => Promise<{ run: (client: EdgeDBClient) => Promise<void> }>;

        // Adjusted update method to use specific types
        update: (
            type: EdgeQL.Twin | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, 
            data: TwinType | TwineetType | FetchedTweetType | TransactionType | VerificationResponseType | UserTokenShareType | TokenStatsType | TokenShareType
        ) => Promise<{ run: (client: EdgeDBClient) => Promise<void> }>;

        // Adjusted select method to return specific types
        select: (
            type: EdgeQL.Twin | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, 
            data: TwinType | TwineetType | FetchedTweetType | TransactionType | VerificationResponseType | UserTokenShareType | TokenStatsType | TokenShareType
        ) => Promise<TwinType[] | TwineetType[] | FetchedTweetType[] | TransactionType[] | VerificationResponseType[] | UserTokenShareType[] | TokenStatsType[] | TokenShareType[]>;

        op: (twinId: string, comparison: '=', otherTwinId: string) => Promise<void>;
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
        Twineet: (twinId: string, data: TwineetType) => Promise<void>;
        Transaction: (data: TransactionType) => Promise<void>;
        Twin: (data: TwinType) => Promise<void>;
        TwinStats: (data: TwinStatsType) => Promise<void>;
        Verification: (data: VerificationResponseType) => Promise<void>;
        UserTokenShare: (data: UserTokenShareType) => Promise<void>;
        TokenStats: (data: TokenStatsType) => Promise<void>;
        TokenShare: (data: TokenShareType) => Promise<void>;
        
    }

    const edgeql: EdgeQL;
    export default edgeql;
}