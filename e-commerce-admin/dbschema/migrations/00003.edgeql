CREATE MIGRATION m17kklbj5g3r5xay7y5bkzb6m5o6g5yc7jd7oroybubzqanijsxivq
    ONTO m1sky5rggqd4t356vow2gbfgcwchtdqpufphcabykzpwd5nm74ps3a
{
  ALTER TYPE default::Order {
      ALTER PROPERTY customerEmail {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
