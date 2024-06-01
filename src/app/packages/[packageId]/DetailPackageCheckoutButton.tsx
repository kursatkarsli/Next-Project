"use client"
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function DetailPackageCheckoutButton() {
  const router = useRouter();

  return (
    <Button type="primary" onClick={() => router.push("/checkout")}>
      Ödeme yap
    </Button>
  );
}

export default DetailPackageCheckoutButton;
