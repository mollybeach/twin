CREATE MIGRATION m1vqirloo52lhjfl5w4b2dndfkdkojt2bveximrbvm32qqzhkkxspq
    ONTO m1okqr4iwn5dmnhyih5uh4sn7zczdsd5mtsl2r2qlipt37irw76paa
{
  ALTER TYPE default::TwinStats {
      ALTER PROPERTY replies {
          RENAME TO repliesCount;
      };
  };
  ALTER TYPE default::Twineet {
      ALTER PROPERTY likes {
          RENAME TO likesCount;
      };
  };
  ALTER TYPE default::Twineet {
      ALTER PROPERTY replies {
          RENAME TO repliesCount;
      };
  };
  ALTER TYPE default::Twineet {
      ALTER PROPERTY retwineets {
          RENAME TO retwineetsCount;
      };
  };
};
