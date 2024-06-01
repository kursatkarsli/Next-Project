"use client";
import { useState } from "react";
import {
  Card,
  List,
  Button,
  message,
  Layout,
  Typography,
  Row,
  Col,
} from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetPackagesQuery } from "@/redux/slices/apiSlice";
import styles from "./Packages.module.css"; // Assuming you have a CSS module for custom styles
import Image from "next/image";
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Packages = () => {
  const { data, error, isLoading } = useGetPackagesQuery();
  const [selectedPackages, setSelectedPackages] = useState<any[]>([]);
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading packages.</div>;

  const handleSelect = (id: any) => {
    setSelectedPackages((prev) =>
      prev.find((packages: any) => packages._id === id._id)
        ? prev.filter((pkg: any) => pkg._id !== id._id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedPackages.length === 0) {
      message.warning("Please select at least one package.");
      return;
    }
    localStorage.setItem("selectedPackages", JSON.stringify(selectedPackages));
    router.push("/checkout");
  };

  const calculateTotalPrice = () => {
    return selectedPackages.reduce((total, pkg) => total + pkg.price, 0);
  };

  return (
    <Layout className={styles.layout}>
      <Content style={{ padding: "1rem" }} className={styles.content}>
        <List
          grid={{ gutter: 16, md: 1, xl: 3, xs: 1, lg: 2, sm: 1 }}
          dataSource={data!.allPackages}
          renderItem={(pkg: any) => (
            <List.Item>
              <Card
                styles={{
                  body: {
                    padding: "0",
                  },
                }}
                bordered={selectedPackages.find(
                  (packages: any) => packages._id === pkg._id
                )}
                onClick={() => handleSelect(pkg)}
                className={
                  (selectedPackages.find(
                    (packages: any) => packages._id === pkg._id
                  )
                    ? styles.selectedCard
                    : "",
                  styles.cards)
                }
                hoverable
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Image
                      src={pkg.imagePath}
                      alt="Product Image"
                      objectFit="cover"
                      fill={true}
                      className={styles.image}
                    />
                  </Col>
                  <Col span={8}>
                    <p>{pkg.details.join(", ")}</p>
                    <p>
                      {pkg.price} {pkg.currency}
                    </p>
                    <Link href={`/packages/${pkg._id}`} passHref>
                      <Button type="link">Details</Button>
                    </Link>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
        <div className={styles.footer}>
          <Title level={4}>
            Seçilen Paket Tutarı: {calculateTotalPrice()}₺
          </Title>
          <Button type="primary" onClick={handleContinue}>
            Devam Et
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Packages;
