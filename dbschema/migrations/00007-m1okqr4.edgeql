CREATE MIGRATION m1okqr4iwn5dmnhyih5uh4sn7zczdsd5mtsl2r2qlipt37irw76paa
    ONTO m1fawjmvuadooks435h3spkzis6mwlyvpki4atui7gw4mkwnhtylbq
{
  ALTER TYPE default::Twin {
      ALTER PROPERTY createdAt {
          RENAME TO timestamp;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY createdAt {
          RENAME TO timestamp;
      };
  };
};
