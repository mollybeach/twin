CREATE MIGRATION m1n4jy6gapwgwia2hzzozo3iuw5kvs3tmjrmkpe4u3yc4pdwqi5laa
    ONTO m1skglqzoyrmzffpg6ryy3h2npvfdzabyqqszcxzpowpk3pcv5vjwa
{
  ALTER TYPE default::Agent {
      DROP LINK analytics;
      DROP LINK fetchedTweets;
      DROP LINK stats;
      DROP LINK twineets;
      DROP LINK verification;
      DROP PROPERTY agentId;
      DROP PROPERTY autoReply;
      DROP PROPERTY createdAt;
      DROP PROPERTY description;
      DROP PROPERTY isListed;
      DROP PROPERTY modelData;
      DROP PROPERTY personality;
      DROP PROPERTY price;
      DROP PROPERTY profileImage;
      DROP PROPERTY twinHandle;
      DROP PROPERTY twitterHandle;
  };
  DROP TYPE default::MarketplaceStore;
  DROP TYPE default::Agent;
  DROP TYPE default::AgentStats;
  DROP TYPE default::Analytics;
  DROP TYPE default::CryptoHolding;
  DROP TYPE default::DailyImpressions;
  DROP TYPE default::Demographics;
  DROP TYPE default::FetchedTweet;
  DROP TYPE default::Notification;
  DROP TYPE default::PeakHours;
  DROP TYPE default::ReachByPlatform;
  DROP TYPE default::TokenShare;
  DROP TYPE default::TokenStats;
  DROP TYPE default::TopInteractions;
  DROP TYPE default::Transaction;
  DROP TYPE default::Twineet;
  DROP TYPE default::UserTokenShare;
  DROP TYPE default::Verification;
  DROP SCALAR TYPE default::AgentIdType;
  DROP SCALAR TYPE default::NotificationType;
  DROP SCALAR TYPE default::TransactionType;
};
