// app/packages/page.tsx
"use client";
import { useState } from "react";
import { Card, List, Button, message, Layout, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetPackagesQuery } from "@/redux/slices/apiSlice";

const { Header, Content } = Layout;

const Packages = () => {
  const { data, error, isLoading } = useGetPackagesQuery();
  const [selectedPackages, setSelectedPackages] = useState<any[]>([]);
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading packages.</div>;

  const handleSelect = (id: any) => {
    setSelectedPackages((prev) =>
      prev.find((packages: any) => packages._id == id._id)
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

  return (
    <Layout>
      <Header>
        <Row justify="space-between">
          <Col>
            <div>Company Logo</div>
          </Col>
          <Col>
            <div>User Email</div>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "1rem" }}>
        <h1>Packages</h1>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data!.allPackages}
          renderItem={(pkg: any) => (
            <List.Item>
              <Card
                title={pkg.name}
                bordered={selectedPackages.find((packages: any) => packages._id == pkg._id)
                }
                onClick={() => handleSelect(pkg)}
                style={{
                  borderColor: selectedPackages.find((packages: any) => packages._id == pkg._id)
                    ? "green"
                    : undefined,
                }}
              >
                <p>{pkg.details.join(", ")}</p>
                <p>
                  {pkg.price} {pkg.currency}
                </p>
                <Link href={`/packages/${pkg._id}`} passHref>
                  <Button type="link">Details</Button>
                </Link>
              </Card>
            </List.Item>
          )}
        />
        <div>
          <h2>Total: {selectedPackages.length}</h2>
          <Button type="primary" onClick={handleContinue}>
            Devam Et
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Packages;
