CREATE MIGRATION m16z3ebe4fcf75fcs5txk5ud6ej6n7h3kujcbodykfvy2qguq3zweq
    ONTO m1kvvynkiwilhkiohpgedjnyq3ih6efonuyd7ykl3pm4xh3aks3jca
{
  ALTER TYPE default::Analytics {
      ALTER LINK cryptoHoldings {
          RESET CARDINALITY USING (SELECT
              .cryptoHoldings 
          LIMIT
              1
          );
      };
      ALTER LINK dailyImpressions {
          RESET CARDINALITY USING (SELECT
              .dailyImpressions 
          LIMIT
              1
          );
      };
      ALTER LINK demographics {
          RESET CARDINALITY USING (SELECT
              .demographics 
          LIMIT
              1
          );
      };
      ALTER LINK peakHours {
          RESET CARDINALITY USING (SELECT
              .peakHours 
          LIMIT
              1
          );
      };
      ALTER LINK reachByPlatform {
          RESET CARDINALITY USING (SELECT
              .reachByPlatform 
          LIMIT
              1
          );
      };
      ALTER LINK topInteractions {
          RESET CARDINALITY USING (SELECT
              .topInteractions 
          LIMIT
              1
          );
      };
  };
  ALTER TYPE default::DailyImpressions {
      ALTER PROPERTY date {
          SET TYPE std::datetime USING (<std::datetime>.date);
      };
  };
};
