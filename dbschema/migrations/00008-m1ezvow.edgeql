CREATE MIGRATION m1ezvownee66rk34z6ruqpxvhlxsfjsffh2zxhtlxcxhx4kxslyxzq
    ONTO m1itmca36luxffxzpwkutyqexrfyfeornzuffzsdr2ydvupke4hdfq
{
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
