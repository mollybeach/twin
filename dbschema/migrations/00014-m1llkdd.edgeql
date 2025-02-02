CREATE MIGRATION m1llkddyjs5nqmqbajtgnor7fx36rbqqdqmpibqxye6fsxloyp33za
    ONTO m1gsvruer7wkzs6ky4iqz2xiw6uvlxjnz7cl7n4usxahynnis2njiq
{
  ALTER TYPE default::Agent {
      ALTER LINK fetchedTweets {
          SET REQUIRED USING (<default::FetchedTweet>{});
      };
      ALTER LINK transactions {
          SET REQUIRED USING (<default::Transaction>{});
      };
      ALTER LINK twineets {
          SET REQUIRED USING (<default::Twineet>{});
      };
  };
  ALTER TYPE default::TokenShare {
      ALTER LINK shareholders {
          SET REQUIRED USING (<default::UserTokenShare>{});
      };
  };
};
