"use client";
import { Typography } from "antd";
function Tags({ tag }: any) {
  return (
    <Typography.Text style={{ fontSize: "12px" }}>{tag}</Typography.Text>
  );
}

export default Tags;
