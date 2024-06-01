"use client";
import { useLoginMutation } from "@/redux/slices/apiSlice";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const useFinish = async (values: { email: string; code: string }) => {
  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter();
  try {
    const { token } = await login(values).unwrap();
    localStorage.setItem("token", token);
    router.push("/packages");
  } catch (err) {
    message.error("Login failed. Please check your credentials.");
  }
};
