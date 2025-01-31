CREATE MIGRATION m1ll3ej6ulq76xrvx7ypxztpppoinvetjyjhh4orj6bdgb6eps2r7q
    ONTO initial
{
  CREATE TYPE default::AgentStats {
      CREATE REQUIRED PROPERTY interactions: std::int16;
      CREATE REQUIRED PROPERTY replies: std::int16;
      CREATE REQUIRED PROPERTY uptime: std::str;
  };
  CREATE TYPE default::FetchedTweet {
      CREATE REQUIRED PROPERTY edit_history_tweet_ids: array<std::str>;
      CREATE REQUIRED PROPERTY text: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::TokenShare {
      CREATE REQUIRED PROPERTY purchaseDate: std::datetime;
      CREATE REQUIRED PROPERTY purchasePrice: std::decimal;
      CREATE REQUIRED PROPERTY shares: std::int16;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
  CREATE TYPE default::Twineet {
      CREATE REQUIRED PROPERTY agentId: std::str;
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
  CREATE TYPE default::Agent {
      CREATE REQUIRED LINK fetchedTweets: default::FetchedTweet;
      CREATE REQUIRED LINK stats: default::AgentStats;
      CREATE REQUIRED LINK tokenShares: default::TokenShare;
      CREATE REQUIRED LINK twineets: default::Twineet;
      CREATE REQUIRED PROPERTY analytics: std::json;
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY modelData: std::json;
      CREATE REQUIRED PROPERTY personality: std::str;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED PROPERTY profileImage: std::str;
      CREATE REQUIRED PROPERTY twinHandle: std::str;
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
      CREATE REQUIRED PROPERTY verification: std::json;
  };
  CREATE SCALAR TYPE default::NotificationType EXTENDING enum<`create`, buy, sell>;
  CREATE TYPE default::Notification {
      CREATE REQUIRED PROPERTY message: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY twinHandle: std::str;
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
      CREATE REQUIRED PROPERTY type: default::NotificationType;
  };
  CREATE SCALAR TYPE default::TransactionType EXTENDING enum<buy, sell>;
  CREATE TYPE default::Transaction {
      CREATE REQUIRED PROPERTY agentId: std::str;
      CREATE REQUIRED PROPERTY pricePerShare: std::decimal;
      CREATE REQUIRED PROPERTY shares: std::int16;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY totalAmount: std::decimal;
      CREATE REQUIRED PROPERTY type: default::TransactionType;
  };
  CREATE TYPE default::MarketplaceStore {
      CREATE REQUIRED LINK agents: default::Agent;
      CREATE REQUIRED LINK notification: default::Notification;
      CREATE REQUIRED LINK transactions: default::Transaction;
  };
  CREATE TYPE default::AgentConfig {
      CREATE REQUIRED LINK fetchedTweets: default::FetchedTweet;
      CREATE REQUIRED LINK stats: default::AgentStats;
      CREATE REQUIRED LINK twineets: default::Twineet;
      CREATE REQUIRED PROPERTY agentId: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY autoReply: std::bool;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY isListed: std::bool;
      CREATE REQUIRED PROPERTY modelData: std::json;
      CREATE REQUIRED PROPERTY personality: std::str;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED PROPERTY profileImage: std::str;
      CREATE REQUIRED PROPERTY twinHandle: std::str;
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
  };
  CREATE TYPE default::TokenStats {
      CREATE REQUIRED PROPERTY change24h: std::decimal;
      CREATE REQUIRED PROPERTY marketCap: std::decimal;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED PROPERTY volume24h: std::decimal;
  };
};
