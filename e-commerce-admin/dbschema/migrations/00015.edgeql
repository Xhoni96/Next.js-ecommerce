CREATE MIGRATION m1lvqslrcmx6rglpsjmxu5wrkaakhqitp4scboc7zci6nxl2myftqa
    ONTO m1u7msk3qe4fhyqc7lt233jnakptbyyqxm3tkju6gbel7kz4t7kkra
{
  ALTER TYPE default::Order {
      ALTER LINK store {
          RESET CARDINALITY USING (SELECT
              .store 
          LIMIT
              1
          );
      };
  };
};
