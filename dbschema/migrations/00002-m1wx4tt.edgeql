CREATE MIGRATION m1wx4ttnrgrdurl5de4axv6d7ld57wxyvfr4hnfvca4u54amylzi7a
    ONTO m17arub3rf26fmmifljk7m7r4cmobtyta4ddmuolvih436mg5p2xjq
{
  CREATE TYPE default::CryptoHolding {
      CREATE REQUIRED PROPERTY amount: std::decimal;
      CREATE REQUIRED PROPERTY change24h: std::decimal;
      CREATE REQUIRED PROPERTY symbol: std::str;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY value: std::decimal;
  };
  CREATE TYPE default::DailyImpressions {
      CREATE REQUIRED PROPERTY count: std::int16;
      CREATE REQUIRED PROPERTY date: std::datetime;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::Demographics {
      CREATE REQUIRED PROPERTY age: default::AgeGroup;
      CREATE REQUIRED PROPERTY percentage: std::decimal;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::PeakHours {
      CREATE REQUIRED PROPERTY engagement: std::decimal;
      CREATE REQUIRED PROPERTY hour: std::int16;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::ReachByPlatform {
      CREATE REQUIRED PROPERTY count: std::int16;
      CREATE REQUIRED PROPERTY platform: default::PlatformType;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::TopInteractions {
      CREATE REQUIRED PROPERTY count: std::int16;
      CREATE REQUIRED PROPERTY kind: default::InteractionGroup;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::Analytics {
      CREATE REQUIRED MULTI LINK cryptoHoldings: default::CryptoHolding;
      CREATE REQUIRED MULTI LINK dailyImpressions: default::DailyImpressions;
      CREATE REQUIRED MULTI LINK demographics: default::Demographics;
      CREATE REQUIRED MULTI LINK peakHours: default::PeakHours;
      CREATE REQUIRED MULTI LINK reachByPlatform: default::ReachByPlatform;
      CREATE REQUIRED MULTI LINK topInteractions: default::TopInteractions;
      CREATE REQUIRED PROPERTY clickThroughRate: std::decimal;
      CREATE REQUIRED PROPERTY engagementRate: std::decimal;
      CREATE REQUIRED PROPERTY impressions: std::int16;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::FetchedTweet {
      CREATE REQUIRED PROPERTY edit_history_tweet_ids: array<std::str>;
      CREATE REQUIRED PROPERTY text: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::UserTokenShare {
      CREATE REQUIRED PROPERTY purchaseDate: std::datetime;
      CREATE REQUIRED PROPERTY purchasePrice: std::decimal;
      CREATE REQUIRED PROPERTY shares: std::decimal;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
  CREATE TYPE default::TokenShare {
      CREATE REQUIRED MULTI LINK shareholders: default::UserTokenShare;
      CREATE REQUIRED PROPERTY availableShares: std::int16;
      CREATE REQUIRED PROPERTY pricePerShare: std::decimal;
      CREATE REQUIRED PROPERTY totalShares: std::int16;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::TokenStats {
      CREATE REQUIRED PROPERTY change24h: std::decimal;
      CREATE REQUIRED PROPERTY marketCap: std::decimal;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY volume24h: std::decimal;
  };
  CREATE TYPE default::Transaction {
      CREATE REQUIRED PROPERTY kind: default::TransactionGroup;
      CREATE REQUIRED PROPERTY pricePerShare: std::decimal;
      CREATE REQUIRED PROPERTY shares: std::int16;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY totalAmount: std::decimal;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::TwinStats {
      CREATE REQUIRED PROPERTY interactions: std::int16;
      CREATE REQUIRED PROPERTY replies: std::int16;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY uptime: std::str;
  };
  CREATE TYPE default::Twineet {
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
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::Verification {
      CREATE REQUIRED PROPERTY isVerified: std::bool;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY verificationDate: std::datetime;
  };
  CREATE TYPE default::Twin {
      CREATE REQUIRED LINK analytics: default::Analytics;
      CREATE REQUIRED MULTI LINK fetchedTweets: default::FetchedTweet;
      CREATE REQUIRED LINK tokenShares: default::TokenShare;
      CREATE REQUIRED LINK tokenStats: default::TokenStats;
      CREATE REQUIRED MULTI LINK transactions: default::Transaction;
      CREATE REQUIRED LINK stats: default::TwinStats;
      CREATE REQUIRED MULTI LINK twineets: default::Twineet;
      CREATE REQUIRED LINK verification: default::Verification;
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
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
  };
  CREATE TYPE default::Notification {
      CREATE REQUIRED PROPERTY kind: default::NotificationGroup;
      CREATE REQUIRED PROPERTY message: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY twinHandle: std::str;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
  };
  CREATE TYPE default::User {
      CREATE OPTIONAL MULTI LINK transactions: default::Transaction;
      CREATE OPTIONAL MULTI LINK twins: default::Twin;
      CREATE REQUIRED PROPERTY birthday: std::datetime;
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY passwordHash: std::str;
      CREATE REQUIRED PROPERTY userId: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY walletAddress: std::str;
  };
};
