CREATE MIGRATION m1wq5v7ua5zfjlrtpqizsgzx4oicdmybcmvvxi34ut4gsbel4jgxtq
    ONTO m167rvkripurkbobig7m4zi3juucqwv2yjqjrawfzbgucbto7jhxga
{
  ALTER TYPE default::Store {
      ALTER LINK orders {
          ON TARGET DELETE ALLOW;
      };
  };
};
