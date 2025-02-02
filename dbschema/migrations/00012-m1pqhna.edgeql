CREATE MIGRATION m1pqhna75jqok2b4odrin6kidh5snuuhgjwha3sk7nqglghxynigqq
    ONTO m1kh6c6kq4r2r2e3aoefyxe7glz2mc5lmoa577v763yqafw64hxtba
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
};
