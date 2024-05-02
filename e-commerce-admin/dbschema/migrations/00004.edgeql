CREATE MIGRATION m1dot7psifhcztaupsyawhf2wl2n3xto7yxwidzwjv4fw7dzowgvqa
    ONTO m17kklbj5g3r5xay7y5bkzb6m5o6g5yc7jd7oroybubzqanijsxivq
{
  ALTER TYPE default::Billboard {
      CREATE REQUIRED PROPERTY isDefault: std::bool {
          SET default := false;
      };
  };
};
