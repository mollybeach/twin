CREATE MIGRATION m1dz372rdmypoqr66keldqr54qcbakg5xyf5y3dkookmuqlhcgduxq
    ONTO m1m3mzioovxcrkm67yqzvbxd7xti3xvtaymcpxlg46732hbdheskoq
{
  ALTER TYPE default::User {
      CREATE OPTIONAL MULTI LINK notifications: default::Notification;
      CREATE OPTIONAL MULTI LINK tokenShares: default::TokenShare;
      CREATE OPTIONAL MULTI LINK tokenStats: default::TokenStats;
      CREATE OPTIONAL MULTI LINK userTokenShares: default::UserTokenShare;
  };
};
