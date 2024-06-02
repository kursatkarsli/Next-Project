"use client";
import { Col, Typography } from "antd";
import styles from "./DetailPackage.module.css";
function Tags({ tag }: any) {
  return (
    <Typography.Text style={{ fontSize: "12px" }}>{tag}</Typography.Text>
  );
}

export default Tags;
