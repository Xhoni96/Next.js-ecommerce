CREATE MIGRATION m16w7kp2apdnqqdkszusrkkpuykgexrhjww7kkifeqis2sbqhbzsba
    ONTO m1wq5v7ua5zfjlrtpqizsgzx4oicdmybcmvvxi34ut4gsbel4jgxtq
{
  ALTER TYPE default::Store {
      ALTER LINK orders {
          RESET ON TARGET DELETE;
      };
  };
};
