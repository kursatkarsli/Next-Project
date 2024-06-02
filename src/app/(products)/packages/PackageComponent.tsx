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
  Divider,
} from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetPackagesQuery } from "@/redux/slices/apiSlice";
import styles from "./Packages.module.css"; // Assuming you have a CSS module for custom styles
import Image from "next/image";
import { setCookie } from "cookies-next";
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Packages = () => {
  const { data, error, isLoading } = useGetPackagesQuery();
  const [selectedPackages, setSelectedPackages] = useState<any[]>([]);
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading packages.</div>;

  const handleSelect = (selectedPack: any) => {
    const selectedPackageList = selectedPackages.find(
      (packages: any) => packages._id === selectedPack._id
    )
      ? selectedPackages.filter((pkg: any) => pkg._id !== selectedPack._id)
      : [...selectedPackages, selectedPack];
    setSelectedPackages((prev) =>
      prev.find((packages: any) => packages._id === selectedPack._id)
        ? prev.filter((pkg: any) => pkg._id !== selectedPack._id)
        : [...prev, selectedPack]
    );
    const extractedPackages = selectedPackageList.map((pkg: any) => ({
      _id: pkg._id,
      currency: pkg.currency,
      price: pkg.price,
      name: pkg.name,
    }));
    setCookie("selectedPackages", extractedPackages);
    localStorage.setItem(
      "selectedPackages",
      JSON.stringify(selectedPackageList)
    );
  };

  const handleContinue = () => {
    if (selectedPackages.length === 0) {
      message.warning("Please select at least one package.");
      return;
    }
    router.push("/checkout");
  };

  const calculateTotalPrice = () => {
    return selectedPackages.reduce((total, pkg) => total + pkg.price, 0);
  };
  return (
    <Layout className={styles.layout}>
      <Content style={{ padding: "1rem" }} className={styles.content}>
        <List
          grid={{ gutter: 16, md: 1, xl: 2, xs: 1, lg: 2, sm: 1 }}
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
                  (styles.cards,
                  selectedPackages.find((packages: any) => {
                    return packages._id == pkg._id;
                  })
                    ? styles.selectedCard
                    : "")
                }
                hoverable
              >
                <Row gutter={16} style={{ margin: 0 }}>
                  <Col span={8}>
                    <Image
                      src={pkg.imagePath}
                      alt="Product Image"
                      objectFit="cover"
                      fill={true}
                      className={styles.image}
                    />
                  </Col>
                  <Col span={16} className={styles.content_description}>
                    <Row gutter={12} style={{ gap: "0.5rem" }}>
                      {" "}
                      <Col span={24}>
                        <Row justify={"space-between"}>
                          <Col span={12}>
                            <Text strong>{pkg.name} </Text>
                          </Col>
                          <Col span={4}>
                            <Text strong>
                              {" "}
                              {pkg.price} {pkg.currency}{" "}
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row>
                          {" "}
                          <ul className={styles.customList}>
                            {pkg.details.map((detail: any, index: number) => (
                              <li key={index} className={styles.customListItem}>
                                <Text>{detail}</Text>
                              </li>
                            ))}
                          </ul>
                        </Row>
                      </Col>
                      <Link href={`/packages/${pkg._id}`} passHref>
                        <Button color="#00BBB4" type="link">
                          Paket detaylarını görüntüle
                        </Button>
                      </Link>
                    </Row>
                    <Divider className={styles.divider} />
                    <Row gutter={12} style={{ gap: "0.5rem" }}>
                      {" "}
                      <Col span={24}>
                        <Row>
                          {" "}
                          <ul className={styles.customListForTags}>
                            {pkg.tags.map((detail: any, index: number) => (
                              <li
                                key={index}
                                className={styles.customListItemForTag}
                              >
                                <Text style={{ fontSize: "12px" }}>
                                  {detail}
                                </Text>
                              </li>
                            ))}
                          </ul>
                        </Row>
                      </Col>
                    </Row>
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
            Ödeme Yap{" "}
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Packages;
