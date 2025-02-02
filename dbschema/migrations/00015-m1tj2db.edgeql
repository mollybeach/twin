CREATE MIGRATION m1tj2dbay6bzounc2fgapzorw4tkpi5o5i2fzlw36hgvadyibrflpa
    ONTO m1llkddyjs5nqmqbajtgnor7fx36rbqqdqmpibqxye6fsxloyp33za
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
};
