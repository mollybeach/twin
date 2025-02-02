// app/types/edgeql-js.d.ts
declare module '@/dbschema/edgeql-js' {
    interface EdgeQL {
        query: (queryString: string) => Promise<any>;
        cast: (value: any, type: number | Date) => any;
        decimal: (value: any) => any;
        insert: (type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, data: any) => Promise<any>;
        update: (type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, data: any) => Promise<any>;
        select: (type: EdgeQL.Agent | EdgeQL.Twineet | EdgeQL.FetchedTweet | EdgeQL.Transaction | EdgeQL.Verification | EdgeQL.UserTokenShare | EdgeQL.TokenStats | EdgeQL.TokenShare, data: any) => Promise<any>;
        op: (agentId: string, data: any, agentId: string) => Promise<any> 
        run: (data: any) => Promise<any>;
        filter: (data: any) => Promise<any>;
        datetime: (date: Date) => Promise<any>;
        // Add more methods and properties as needed
        Analytics: (data: any) => Promise<any>;
        CryptoHolding: (data: any) => Promise<any>;
        Demographics: (data: any) => Promise<any>;
        DailyImpressions: (data: any) => Promise<any>;
        PeakHours: (data: any) => Promise<any>;
        ReachByPlatform: (data: any) => Promise<any>;
        TopInteractions: (data: any) => Promise<any>;
        FetchedTweet: (data: any) => Promise<any>;
        Twineet: (agentId: string, data: any) => Promise<any>;
        Transaction: (data: any) => Promise<any>;
        Agent: (data: any) => Promise<any>;
        AgentStats: (data: any) => Promise<any>;
        Verification: (data: any) => Promise<any>;
        UserTokenShare: (data: any) => Promise<any>;
        TokenStats: (data: any) => Promise<any>;
        TokenShare: (data: any) => Promise<any>;
    }

    const edgeql: EdgeQL;
    export default edgeql;
}