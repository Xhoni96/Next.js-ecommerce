CREATE MIGRATION m16mm4ntzdi7bj67qigg5sf6rvgshiycw32zifwk4ivs2z2g5wrkqq
    ONTO m1dot7psifhcztaupsyawhf2wl2n3xto7yxwidzwjv4fw7dzowgvqa
{
  ALTER TYPE default::Billboard {
      ALTER PROPERTY updatedAt {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Store {
      DROP PROPERTY updatedAt;
  };
};
