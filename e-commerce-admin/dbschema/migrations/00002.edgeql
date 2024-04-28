CREATE MIGRATION m1sky5rggqd4t356vow2gbfgcwchtdqpufphcabykzpwd5nm74ps3a
    ONTO m1k3wat5f2mkpzu5vchdyawf2lue2yuc3lbnjyhcgtymcwqsu4la4a
{
  ALTER TYPE default::Order {
      CREATE REQUIRED PROPERTY customerEmail: std::str {
          SET REQUIRED USING ('myname@email.com');
          CREATE CONSTRAINT std::max_len_value(254);
          CREATE CONSTRAINT std::regexp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
      };
      CREATE REQUIRED PROPERTY customerName: std::str {
          SET REQUIRED USING ('My Name');
      };
  };
};
