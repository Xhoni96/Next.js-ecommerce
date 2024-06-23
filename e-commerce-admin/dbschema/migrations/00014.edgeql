CREATE MIGRATION m1u7msk3qe4fhyqc7lt233jnakptbyyqxm3tkju6gbel7kz4t7kkra
    ONTO m16w7kp2apdnqqdkszusrkkpuykgexrhjww7kkifeqis2sbqhbzsba
{
  ALTER TYPE default::Order {
      ALTER LINK store {
          SET MULTI;
      };
  };
};
