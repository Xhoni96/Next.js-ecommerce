import { formatter } from "@/lib/utils";

type CurrencyProps = {
  value: string | number;
};
export const Currency = ({ value }: CurrencyProps) => {
  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};
