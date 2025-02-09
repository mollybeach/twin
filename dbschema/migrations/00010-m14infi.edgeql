CREATE MIGRATION m14infixsa2fvjxkljsaspu7fumpwzj5qxc3ssvdjvzsuhjtk7g4ua
    ONTO m1ozimvocsbhua7bcmmhkpuowjajgmvchddb4x5wj4lvwu4ffm6moa
{
  ALTER TYPE default::Transaction {
      ALTER PROPERTY shares {
          SET TYPE std::decimal;
      };
  };
};
