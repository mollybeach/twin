CREATE MIGRATION m1v27wntumq3uvc7px3hh25hdxux42egdjks446i3kkp7d4bmakbuq
    ONTO m1xtcvtmog7xmcjofsyfi7mygmvo5le7cvayvif7mwyhqtyajfkrpq
{
  ALTER TYPE default::Agent {
      DROP LINK fetchedTweets;
      DROP LINK stats;
      DROP LINK twineets;
      DROP PROPERTY analytics;
      DROP PROPERTY createdAt;
      DROP PROPERTY description;
      DROP PROPERTY modelData;
      DROP PROPERTY personality;
      DROP PROPERTY price;
      DROP PROPERTY profileImage;
      DROP PROPERTY twinHandle;
      DROP PROPERTY twitterHandle;
      DROP PROPERTY verification;
  };
  DROP TYPE default::MarketplaceStore;
  DROP TYPE default::Agent;
  DROP TYPE default::AgentConfig;
  DROP TYPE default::AgentStats;
  DROP TYPE default::FetchedTweet;
  DROP TYPE default::Notification;
  DROP TYPE default::TokenStats;
  DROP TYPE default::Transaction;
  DROP TYPE default::Twineet;
  DROP SCALAR TYPE default::NotificationType;
  DROP SCALAR TYPE default::TransactionType;
};
