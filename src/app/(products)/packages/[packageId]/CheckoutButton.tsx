"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

function CheckoutButton() {
  const router = useRouter();
 

  return (
    <Button
      size="large"
      style={{ width: "100%" }}
      type="primary"
      typeof="submit"
      onClick={() =>{
        router.push('/checkout')
      }}
    >
      Ödeme Yap{" "}
    </Button>
  );
}

export default CheckoutButton;
