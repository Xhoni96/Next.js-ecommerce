CREATE MIGRATION m13j55zlg3cba3ajvwvjbpg2pfu4pqubhuwvbhm4zxtywub5azj3bq
    ONTO m1hpoaql7m4jlo2qocivmv75a6r54yabgxmaamrexwwx7qmmnad3lq
{
  ALTER TYPE default::Order {
      ALTER PROPERTY customerEmail {
          DROP CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Product {
      CREATE LINK order: default::Order;
  };
};
