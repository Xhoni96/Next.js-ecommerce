import { useOrigin } from "@/hooks/useOrigin";
import { ApiAlert, Loader } from "./ui";
import { useParams } from "next/navigation";

type Props = {
  entityName: string;
  entityIdName: string;
};
export const ApiList = ({ entityName, entityIdName }: Props) => {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return origin ? (
    <>
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
      {entityName === "billboards" ? (
        <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/default`} />
      ) : null}
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
    </>
  ) : (
    <div className="flex justify-center items-center p-24">
      <Loader size={25} />
    </div>
  );
};
