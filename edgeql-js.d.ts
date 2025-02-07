// path: ./edgeql-js.d.ts
/*
import {
    TwinType,
    TwineetType,
    FetchedTweetType,
    TransactionType,
    VerificationResponseType,
    UserTokenShareType,
    TokenStatsType,
    TokenShareType,
} from '@/types/types';

export declare module '@/dbschema/edgeql-js' {
    interface EdgeQL {
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
        Analytics: (data: object) => Promise<void>;
        CryptoHolding: (data: object) => Promise<void>;
        Demographics: (data: object) => Promise<void>;
        DailyImpressions: (data: object) => Promise<void>;
        PeakHours: (data: object) => Promise<void>;
        ReachByPlatform: (data: object) => Promise<void>;
        TopInteractions: (data: object) => Promise<void>;
        FetchedTweet: (data: object) => Promise<void>;
        Twineet: (twinId: string, data: object) => Promise<void>;
        Transaction: (data: object) => Promise<void>;
        Twin: (data: object) => Promise<void>;
        TwinStats: (data: object) => Promise<void>;
        Verification: (data: object) => Promise<void>;
        UserTokenShare: (data: object) => Promise<void>;
        TokenStats: (data: object) => Promise<void>;
        TokenShare: (data: object) => Promise<void>;
    }

    const edgeql: EdgeQL;
    export default edgeql;
}*/