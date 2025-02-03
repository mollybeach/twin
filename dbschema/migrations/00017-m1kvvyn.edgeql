CREATE MIGRATION m1kvvynkiwilhkiohpgedjnyq3ih6efonuyd7ykl3pm4xh3aks3jca
    ONTO m17tvgnmm4mupe5fk62vdj34b4a664ip42ea5icfybhfndutcvmyha
{
  ALTER TYPE default::Analytics {
      ALTER LINK cryptoHoldings {
          SET MULTI;
      };
      ALTER LINK dailyImpressions {
          SET MULTI;
      };
      ALTER LINK demographics {
          SET MULTI;
      };
      ALTER LINK peakHours {
          SET MULTI;
      };
      ALTER LINK reachByPlatform {
          SET MULTI;
      };
      ALTER LINK topInteractions {
          SET MULTI;
      };
  };
};
