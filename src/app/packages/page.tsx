import React from "react";
import Packages from "./PackageComponent";
import { cookies } from "next/headers";

function PackageComponent() {
  if (typeof window !== "undefined") {
    cookies().set("token", localStorage.getItem("token")!);
  }
  return <Packages />;
}

export default PackageComponent;
