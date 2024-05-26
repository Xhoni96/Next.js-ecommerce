CREATE MIGRATION m1hpoaql7m4jlo2qocivmv75a6r54yabgxmaamrexwwx7qmmnad3lq
    ONTO m1gkz4byjqs53y7jqengngvkwdab5d2rd5ehhmcr77n2uk36mbkx5q
{
  ALTER TYPE default::Order {
      ALTER PROPERTY address {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY phone {
          RESET OPTIONALITY;
      };
  };
};
