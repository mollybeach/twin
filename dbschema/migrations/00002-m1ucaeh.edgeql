CREATE MIGRATION m1ucaehjxf5i3l3rf4ys7tnarua4pqzvonma3yg4ua3v4ddiv6swpq
    ONTO m1ll3ej6ulq76xrvx7ypxztpppoinvetjyjhh4orj6bdgb6eps2r7q
{
  ALTER TYPE default::Agent {
      DROP LINK tokenShares;
  };
};
