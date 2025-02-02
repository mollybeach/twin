CREATE MIGRATION m1kh6c6kq4r2r2e3aoefyxe7glz2mc5lmoa577v763yqafw64hxtba
    ONTO m1wmbf22l4l5rz3flzbqpw52vtw5vzic3butpeyes25jfvpaypz4qa
{
  ALTER TYPE default::UserTokenShare {
      ALTER PROPERTY shares {
          SET TYPE std::decimal;
      };
  };
};
