CREATE MIGRATION m17arub3rf26fmmifljk7m7r4cmobtyta4ddmuolvih436mg5p2xjq
    ONTO initial
{
  CREATE SCALAR TYPE default::AgeGroup EXTENDING enum<`18-24`, `25-34`, `35-44`, `45-54`, `55+`>;
  CREATE SCALAR TYPE default::InteractionGroup EXTENDING enum<likes, retwineets, replies, quotes>;
  CREATE SCALAR TYPE default::NotificationGroup EXTENDING enum<`create`, buy, sell>;
  CREATE SCALAR TYPE default::PlatformType EXTENDING enum<mobile, desktop, tablet>;
  CREATE SCALAR TYPE default::TransactionGroup EXTENDING enum<buy, sell>;
  CREATE SCALAR TYPE default::TwinIdType EXTENDING std::str;
};
