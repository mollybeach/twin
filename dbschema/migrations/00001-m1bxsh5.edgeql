CREATE MIGRATION m1bxsh52yolvkfgpqgj4bdo6zy6hhakcf6hafs6ompn6lqxkizihva
    ONTO initial
{
  CREATE SCALAR TYPE default::TwinIdType EXTENDING std::str;
  CREATE SCALAR TYPE default::UserIdType EXTENDING std::str;
  CREATE TYPE default::Following {
      CREATE REQUIRED PROPERTY following: array<default::TwinIdType>;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  CREATE TYPE default::Followers {
      CREATE REQUIRED PROPERTY userId: array<default::UserIdType>;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
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
  CREATE SCALAR TYPE default::AgeGroup EXTENDING enum<`18-24`, `25-34`, `35-44`, `45-54`, `55+`>;
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
  CREATE SCALAR TYPE default::PlatformType EXTENDING enum<mobile, desktop, tablet>;
  CREATE TYPE default::ReachByPlatform {
      CREATE REQUIRED PROPERTY count: std::int16;
      CREATE REQUIRED PROPERTY platform: default::PlatformType;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE SCALAR TYPE default::InteractionGroup EXTENDING enum<likes, retwineets, replies, quotes>;
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
      CREATE REQUIRED PROPERTY text: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY tweetId: std::str;
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
  CREATE SCALAR TYPE default::TransactionGroup EXTENDING enum<buy, sell>;
  CREATE TYPE default::Transaction {
      CREATE REQUIRED PROPERTY pricePerShare: std::decimal;
      CREATE REQUIRED PROPERTY shares: std::decimal;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY totalAmount: std::decimal;
      CREATE REQUIRED PROPERTY trade: default::TransactionGroup;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  CREATE TYPE default::TwinStats {
      CREATE REQUIRED PROPERTY interactions: std::int16;
      CREATE REQUIRED PROPERTY repliesCount: std::int16;
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
      CREATE REQUIRED PROPERTY likesCount: std::int16 {
          SET default := (<std::int16>0);
      };
      CREATE REQUIRED PROPERTY repliesCount: std::int16 {
          SET default := (<std::int16>0);
      };
      CREATE REQUIRED PROPERTY retwineetsCount: std::int16 {
          SET default := (<std::int16>0);
      };
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: default::UserIdType {
          SET default := 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      };
  };
  CREATE TYPE default::Verification {
      CREATE REQUIRED PROPERTY isVerified: std::bool;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY verificationDate: std::datetime;
  };
  CREATE TYPE default::Twin {
      CREATE REQUIRED LINK analytics: default::Analytics;
      CREATE REQUIRED MULTI LINK fetchedTweets: default::FetchedTweet;
      CREATE OPTIONAL LINK followers: default::Followers;
      CREATE REQUIRED LINK tokenShares: default::TokenShare;
      CREATE REQUIRED LINK tokenStats: default::TokenStats;
      CREATE REQUIRED MULTI LINK transactions: default::Transaction;
      CREATE REQUIRED LINK stats: default::TwinStats;
      CREATE REQUIRED MULTI LINK twineets: default::Twineet;
      CREATE REQUIRED LINK verification: default::Verification;
      CREATE REQUIRED PROPERTY autoReply: std::bool;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY isListed: std::bool;
      CREATE REQUIRED PROPERTY modelData: std::json;
      CREATE REQUIRED PROPERTY personality: std::str;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED PROPERTY profileImage: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY twinHandle: std::str;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY twitterHandle: std::str;
      CREATE REQUIRED PROPERTY userId: default::UserIdType {
          SET default := 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      };
  };
  CREATE TYPE default::Likes {
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  CREATE SCALAR TYPE default::NotificationGroup EXTENDING enum<`create`, buy, sell>;
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
  CREATE TYPE default::Replies {
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY likes: std::int16;
      CREATE REQUIRED PROPERTY timestamp: std::datetime;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  CREATE TYPE default::Retwineets {
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  CREATE TYPE default::User {
      CREATE OPTIONAL LINK following: default::Following;
      CREATE OPTIONAL MULTI LINK likes: default::Likes;
      CREATE OPTIONAL MULTI LINK notifications: default::Notification;
      CREATE OPTIONAL MULTI LINK replies: default::Replies;
      CREATE OPTIONAL MULTI LINK retwineets: default::Retwineets;
      CREATE OPTIONAL MULTI LINK tokenShares: default::TokenShare;
      CREATE OPTIONAL MULTI LINK tokenStats: default::TokenStats;
      CREATE OPTIONAL MULTI LINK transactions: default::Transaction;
      CREATE OPTIONAL MULTI LINK twins: default::Twin;
      CREATE OPTIONAL MULTI LINK userTokenShares: default::UserTokenShare;
      CREATE OPTIONAL PROPERTY birthday: std::datetime;
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY passwordHash: std::str;
      CREATE REQUIRED PROPERTY timestamp: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY userId: default::UserIdType {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY walletAddress: std::str;
      CREATE REQUIRED PROPERTY walletBalance: std::decimal {
          SET default := (<std::decimal>1000000);
      };
  };
};
