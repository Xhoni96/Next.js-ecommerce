CREATE MIGRATION m1gkz4byjqs53y7jqengngvkwdab5d2rd5ehhmcr77n2uk36mbkx5q
    ONTO m1an7tmg7f57cju3ana5giysrbaniyk4sqml2gs5vda4rk73up6nlq
{
  ALTER TYPE default::Order {
      ALTER PROPERTY customerEmail {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY customerName {
          RESET OPTIONALITY;
      };
  };
};
