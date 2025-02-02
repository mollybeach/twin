// app/types/edgeql-js.d.ts
declare module '@/dbschema/edgeql-js' {
    interface EdgeQL {
        query: (queryString: string) => Promise<unknown>;
        cast: (type: decimal.Decimal, value: number | Date) => number | Date;
        decimal: (value: decimal.Decimal) => decimal.Decimal;
        insert: (type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, data: any) => Promise<{ run: (client: any) => Promise<void> }>; 
        update: (type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, data: any) => Promise<{ run: (client: any) => Promise<void> }>; 
        select: (type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, data: any) => Promise<unknown>;
        op: (agentId: string, data: any, agentId: string) => Promise<void>; 
        run: (data: any) => Promise<void>;
        filter: (data: any) => Promise<void>;
        datetime: (date: Date) => Promise<void>;
        // Add more methods and properties as needed
        Analytics: (data: any) => Promise<void>;
        CryptoHolding: (data: any) => Promise<void>;
        Demographics: (data: any) => Promise<void>;
        DailyImpressions: (data: any) => Promise<void>;
        PeakHours: (data: any) => Promise<void>;
        ReachByPlatform: (data: any) => Promise<void>;
        TopInteractions: (data: any) => Promise<void>;
        FetchedTweet: (data: any) => Promise<void>;
        Twineet: (agentId: string, data: any) => Promise<void>;
        Transaction: (data: any) => Promise<void>;
        Agent: (data: any) => Promise<void>;
        AgentStats: (data: any) => Promise<void>;    
        Verification: (data: any) => Promise<void>;
        UserTokenShare: (data: any) => Promise<void>;
        TokenStats: (data: any) => Promise<void>;
        TokenShare: (data: any) => Promise<void>;
    }

    const edgeql: EdgeQL;
    export default edgeql;
}