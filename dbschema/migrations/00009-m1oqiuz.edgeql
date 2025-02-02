CREATE MIGRATION m1oqiuzu4zsup3pfmkmtaroynypkepmn24chdnj6ejn5vhogjecx4q
    ONTO m1ezvownee66rk34z6ruqpxvhlxsfjsffh2zxhtlxcxhx4kxslyxzq
{
  CREATE SCALAR TYPE default::AgentIdType EXTENDING std::str;
  CREATE TYPE default::AgentStats {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY interactions: std::int16;
      CREATE REQUIRED PROPERTY replies: std::int16;
      CREATE REQUIRED PROPERTY uptime: std::str;
  };
  CREATE TYPE default::CryptoHolding {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY amount: std::decimal;
      CREATE REQUIRED PROPERTY change24h: std::decimal;
      CREATE REQUIRED PROPERTY symbol: std::str;
      CREATE REQUIRED PROPERTY value: std::decimal;
  };
  CREATE TYPE default::DailyImpressions {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY count: std::int16;
      CREATE REQUIRED PROPERTY date: std::str;
  };
  CREATE TYPE default::Demographics {
      CREATE REQUIRED PROPERTY age: std::str;
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY percentage: std::decimal;
  };
  CREATE TYPE default::PeakHours {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY engagement: std::decimal;
      CREATE REQUIRED PROPERTY hour: std::int16;
  };
  CREATE TYPE default::ReachByPlatform {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY count: std::int16;
      CREATE REQUIRED PROPERTY platform: std::str;
  };
  CREATE TYPE default::TopInteractions {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY count: std::int16;
      CREATE REQUIRED PROPERTY kind: std::str;
  };
  CREATE TYPE default::Analytics {
      CREATE REQUIRED LINK cryptoHoldings: default::CryptoHolding;
      CREATE REQUIRED LINK dailyImpressions: default::DailyImpressions;
      CREATE REQUIRED LINK demographics: default::Demographics;
      CREATE REQUIRED LINK peakHours: default::PeakHours;
      CREATE REQUIRED LINK reachByPlatform: default::ReachByPlatform;
      CREATE REQUIRED LINK topInteractions: default::TopInteractions;
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY clickThroughRate: std::decimal;
      CREATE REQUIRED PROPERTY engagementRate: std::decimal;
      CREATE REQUIRED PROPERTY impressions: std::int16;
  };
  CREATE TYPE default::FetchedTweet {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY edit_history_tweet_ids: array<std::str>;
      CREATE REQUIRED PROPERTY text: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::UserTokenShare {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY purchaseDate: std::datetime;
      CREATE REQUIRED PROPERTY purchasePrice: std::decimal;
      CREATE REQUIRED PROPERTY shares: std::int16;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
  CREATE TYPE default::TokenShare {
      CREATE REQUIRED LINK shareholders: default::UserTokenShare;
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY availableShares: std::int16;
      CREATE REQUIRED PROPERTY pricePerShare: std::decimal;
      CREATE REQUIRED PROPERTY totalShares: std::int16;
  };
  CREATE TYPE default::TokenStats {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY change24h: std::decimal;
      CREATE REQUIRED PROPERTY marketCap: std::decimal;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED PROPERTY volume24h: std::decimal;
  };
  CREATE SCALAR TYPE default::TransactionType EXTENDING enum<buy, sell>;
  CREATE TYPE default::Transaction {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY kind: default::TransactionType;
      CREATE REQUIRED PROPERTY pricePerShare: std::decimal;
      CREATE REQUIRED PROPERTY shares: std::int16;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY totalAmount: std::decimal;
  };
  CREATE TYPE default::Twineet {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY isLiked: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY isRetwineeted: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY likes: std::int16 {
          SET default := (<std::int16>0);
      };
      CREATE REQUIRED PROPERTY replies: std::int16 {
          SET default := (<std::int16>0);
      };
      CREATE REQUIRED PROPERTY retwineets: std::int16 {
          SET default := (<std::int16>0);
      };
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::Verification {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY isVerified: std::bool;
      CREATE REQUIRED PROPERTY verificationDate: std::datetime;
  };
  CREATE TYPE default::Agent {
      CREATE REQUIRED LINK analytics: default::Analytics;
      CREATE MULTI LINK fetchedTweets: default::FetchedTweet;
      CREATE REQUIRED LINK stats: default::AgentStats;
      CREATE REQUIRED LINK tokenShares: default::TokenShare;
      CREATE REQUIRED LINK tokenStats: default::TokenStats;
      CREATE MULTI LINK transactions: default::Transaction;
      CREATE MULTI LINK twineets: default::Twineet;
      CREATE REQUIRED LINK verification: default::Verification;
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY autoReply: std::bool;
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY isListed: std::bool;
      CREATE REQUIRED PROPERTY modelData: std::json;
      CREATE REQUIRED PROPERTY personality: std::str;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED PROPERTY profileImage: std::str;
      CREATE REQUIRED PROPERTY twinHandle: std::str;
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
  };
  CREATE SCALAR TYPE default::NotificationType EXTENDING enum<`create`, buy, sell>;
  CREATE TYPE default::Notification {
      CREATE REQUIRED PROPERTY agentId: default::AgentIdType;
      CREATE REQUIRED PROPERTY kind: default::NotificationType;
      CREATE REQUIRED PROPERTY message: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY twinHandle: std::str;
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
  };
};
