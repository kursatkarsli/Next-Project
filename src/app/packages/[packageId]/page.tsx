// app/package/[id]/page.tsx

import { useParams } from "next/navigation";
import { useGetPackageDetailsQuery } from "../../../redux/slices/apiSlice";
import { Card, Button } from "antd";
import DetailPackageCheckoutButton from "./DetailPackageCheckoutButton";
import { cookies } from "next/headers";

 const  PackageDetail = async (props:any) => {
  const {params} = props;
  console.log(params, "props deneme");

  const res = await fetch(`https://caseapi-fe.paramtech.com.tr/api/packages/${params.packageId}`,{
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get('token')}`,
    }
  });
  const data = await res.json();

  

  return (
    <Card title={data!.name}>
      {/* <p>{data!.details.join(", ")}</p> */}
      <p>
        {data!.price} {data!.currency}
      </p>
      <p>{data!.moreInformation}</p>
      <DetailPackageCheckoutButton />
    </Card>
  );
};

export default PackageDetail;

