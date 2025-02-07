CREATE MIGRATION m1m3mzioovxcrkm67yqzvbxd7xti3xvtaymcpxlg46732hbdheskoq
    ONTO m1wx4ttnrgrdurl5de4axv6d7ld57wxyvfr4hnfvca4u54amylzi7a
{
  CREATE SCALAR TYPE default::UserIdType EXTENDING std::str;
  ALTER TYPE default::Twin {
      CREATE REQUIRED PROPERTY userId: default::UserIdType {
          SET default := 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY birthday {
          SET OPTIONAL;
      };
      ALTER PROPERTY userId {
          SET TYPE default::UserIdType;
      };
  };
};
