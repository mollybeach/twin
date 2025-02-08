CREATE MIGRATION m1fawjmvuadooks435h3spkzis6mwlyvpki4atui7gw4mkwnhtylbq
    ONTO m1pelfoz33rygl2ibau4dr5jt6smmi54rgqismwgsomtz6ryiwimga
{
  CREATE TYPE default::Likes {
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  ALTER TYPE default::User {
      CREATE OPTIONAL MULTI LINK likes: default::Likes;
  };
  CREATE TYPE default::Replies {
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY likes: std::int16;
      CREATE REQUIRED PROPERTY timestamp: std::datetime;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  ALTER TYPE default::User {
      CREATE OPTIONAL MULTI LINK replies: default::Replies;
  };
  CREATE TYPE default::Retwineets {
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  ALTER TYPE default::User {
      CREATE OPTIONAL MULTI LINK retwineets: default::Retwineets;
  };
};
