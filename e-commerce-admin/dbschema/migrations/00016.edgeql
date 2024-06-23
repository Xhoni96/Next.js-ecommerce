CREATE MIGRATION m147dukwcpweyiqxc5v6qapbugdpx3yr7vjqisv2yevth54mjhjsra
    ONTO m1lvqslrcmx6rglpsjmxu5wrkaakhqitp4scboc7zci6nxl2myftqa
{
  ALTER TYPE default::Order {
      ALTER LINK store {
          SET MULTI;
      };
  };
  ALTER TYPE default::Store {
      ALTER LINK orders {
          ON TARGET DELETE ALLOW;
      };
  };
};
