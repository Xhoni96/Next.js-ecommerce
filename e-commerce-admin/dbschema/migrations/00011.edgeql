CREATE MIGRATION m167rvkripurkbobig7m4zi3juucqwv2yjqjrawfzbgucbto7jhxga
    ONTO m13j55zlg3cba3ajvwvjbpg2pfu4pqubhuwvbhm4zxtywub5azj3bq
{
  ALTER TYPE default::Order {
      ALTER PROPERTY customerEmail {
          SET REQUIRED USING ('testmail@gmail.com');
      };
      ALTER PROPERTY customerName {
          SET REQUIRED USING ('test name');
      };
  };
};
