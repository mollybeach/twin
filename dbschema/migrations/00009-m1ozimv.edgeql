CREATE MIGRATION m1ozimvocsbhua7bcmmhkpuowjajgmvchddb4x5wj4lvwu4ffm6moa
    ONTO m1vqirloo52lhjfl5w4b2dndfkdkojt2bveximrbvm32qqzhkkxspq
{
  ALTER TYPE default::Transaction {
      ALTER PROPERTY kind {
          RENAME TO trade;
      };
  };
};
