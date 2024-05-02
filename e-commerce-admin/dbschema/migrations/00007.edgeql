CREATE MIGRATION m1an7tmg7f57cju3ana5giysrbaniyk4sqml2gs5vda4rk73up6nlq
    ONTO m1jl33zvwl23xzw2lu5ustbiscsrexcn3icxii33ep7ld5sn4eesjq
{
  ALTER TYPE default::Category {
      ALTER PROPERTY updatedAt {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Color {
      ALTER PROPERTY updatedAt {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Order {
      DROP PROPERTY updatedAt;
  };
  ALTER TYPE default::Product {
      ALTER PROPERTY updatedAt {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Size {
      ALTER PROPERTY updatedAt {
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
