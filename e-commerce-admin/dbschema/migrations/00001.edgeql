CREATE MIGRATION m1k3wat5f2mkpzu5vchdyawf2lue2yuc3lbnjyhcgtymcwqsu4la4a
    ONTO initial
{
  CREATE TYPE default::Billboard {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY imageUrl: std::str;
      CREATE REQUIRED PROPERTY label: std::str;
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
  };
  CREATE TYPE default::Store {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY userId: std::str;
  };
  ALTER TYPE default::Billboard {
      CREATE REQUIRED LINK store: default::Store {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  CREATE TYPE default::Category {
      CREATE REQUIRED LINK billboard: default::Billboard;
      CREATE REQUIRED LINK store: default::Store {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::Color {
      CREATE REQUIRED LINK store: default::Store {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY value: std::str;
  };
  CREATE TYPE default::Size {
      CREATE REQUIRED LINK store: default::Store {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY value: std::str;
  };
  CREATE TYPE default::Product {
      CREATE REQUIRED LINK category: default::Category;
      CREATE REQUIRED LINK color: default::Color;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY price: std::decimal;
      CREATE REQUIRED LINK size: default::Size;
      CREATE REQUIRED LINK store: default::Store {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY images: array<std::str>;
      CREATE REQUIRED PROPERTY isArchived: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY isFeatured: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::Order {
      CREATE REQUIRED MULTI LINK products: default::Product;
      CREATE PROPERTY productNames := (std::array_join(std::array_agg(.products.name), ', '));
      CREATE PROPERTY totalPrice := (std::sum(.products.price));
      CREATE REQUIRED LINK store: default::Store {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY address: std::str;
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY isPaid: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY phone: std::str;
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Store {
      CREATE MULTI LINK orders: default::Order;
      CREATE PROPERTY totalRevenue := (std::sum(.orders.totalPrice));
      CREATE PROPERTY totalSales := (std::count((SELECT
          .orders
      FILTER
          (.isPaid = true)
      )));
      CREATE MULTI LINK products: default::Product;
      CREATE PROPERTY inStock := (std::count((SELECT
          .products
      FILTER
          (.isArchived = true)
      )));
  };
};
