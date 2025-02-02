CREATE MIGRATION m1wmbf22l4l5rz3flzbqpw52vtw5vzic3butpeyes25jfvpaypz4qa
    ONTO m1oqiuzu4zsup3pfmkmtaroynypkepmn24chdnj6ejn5vhogjecx4q
{
  ALTER TYPE default::TokenShare {
      ALTER LINK shareholders {
          SET MULTI;
          RESET OPTIONALITY;
      };
  };
};
