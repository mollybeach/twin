CREATE MIGRATION m1pelfoz33rygl2ibau4dr5jt6smmi54rgqismwgsomtz6ryiwimga
    ONTO m1dz372rdmypoqr66keldqr54qcbakg5xyf5y3dkookmuqlhcgduxq
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY walletBalance: std::decimal {
          SET default := (<std::decimal>1000000);
      };
  };
};
