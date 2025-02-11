CREATE MIGRATION m15uy5276ysrpqsc4iq4vjqk6nfjxyjpjamd7cx4oc47l3oyi3pbiq
    ONTO m14infixsa2fvjxkljsaspu7fumpwzj5qxc3ssvdjvzsuhjtk7g4ua
{
  ALTER TYPE default::Twineet {
      CREATE REQUIRED PROPERTY userId: default::UserIdType {
          SET default := 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      };
  };
};
