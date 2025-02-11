CREATE MIGRATION m174d7err4uaxsb4vr65zs73dtzto5hxnwinxlx4fnqen7iiiugwyq
    ONTO m15uy5276ysrpqsc4iq4vjqk6nfjxyjpjamd7cx4oc47l3oyi3pbiq
{
  CREATE TYPE default::Following {
      CREATE REQUIRED PROPERTY following: array<default::TwinIdType>;
      CREATE REQUIRED PROPERTY userId: default::UserIdType;
  };
  CREATE TYPE default::Followers {
      CREATE REQUIRED PROPERTY userId: array<default::UserIdType>;
      CREATE REQUIRED PROPERTY twinId: default::TwinIdType;
  };
  ALTER TYPE default::Twin {
      CREATE OPTIONAL LINK followers: default::Followers;
  };
  ALTER TYPE default::User {
      CREATE OPTIONAL LINK following: default::Following;
  };
};
