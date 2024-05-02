CREATE MIGRATION m1jl33zvwl23xzw2lu5ustbiscsrexcn3icxii33ep7ld5sn4eesjq
    ONTO m16mm4ntzdi7bj67qigg5sf6rvgshiycw32zifwk4ivs2z2g5wrkqq
{
  ALTER TYPE default::Billboard {
      ALTER PROPERTY updatedAt {
          RESET readonly;
      };
  };
};
