// app/checkout/page.tsx
"use client";
import { useState, useEffect } from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Layout,
  Row,
  Col,
  Card,
  List,
} from "antd";
import { useRouter } from "next/navigation";
import {
  useCheckoutMutation,
  useGetContractQuery,
} from "@/redux/slices/apiSlice";
import Link from "next/link";

const { Header, Content } = Layout;

const Checkout = () => {
  const [checkout, { isLoading }] = useCheckoutMutation();
  const { data: contract } = useGetContractQuery();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const packages = JSON.parse(
      localStorage.getItem("selectedPackages") || "[]"
    );
    setSelectedPackages(packages);
  }, []);

  const onFinish = async (values: any) => {
    try {
      await checkout(values).unwrap();
      router.push("/result");
    } catch (err) {
      message.error("Payment failed. Please try again.");
    }
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
        <h1>Checkout</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form name="checkout" onFinish={onFinish}>
              <Form.Item
                name="cardNumber"
                rules={[
                  { required: true, message: "Please enter your card number!" },
                ]}
              >
                <Input placeholder="Card Number" />
              </Form.Item>
              <Form.Item
                name="expiryDate"
                rules={[
                  { required: true, message: "Please enter the expiry date!" },
                ]}
              >
                <Input placeholder="Expiry Date (DD/YY)" />
              </Form.Item>
              <Form.Item
                name="cvv"
                rules={[{ required: true, message: "Please enter the CVV!" }]}
              >
                <Input placeholder="CVV" />
              </Form.Item>
              <Form.Item>
                <Checkbox required>
                  I agree to the <a href="#">terms and conditions</a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Ödeme yap
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <h2>Selected Packages</h2>
            <ul>
              {selectedPackages.map((pkg: any, index) => (
                <List
                  key={index}
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={pkg!.allPackages}
                  renderItem={(pkg: any) => (
                    <List.Item>
                      <Card title={pkg.name}>
                        <p>{pkg.details.join(", ")}</p>
                        <p>
                          {pkg.price} {pkg.currency}
                        </p>
                        <Link href={`/package/${pkg._id}`} passHref>
                          <Button type="link">Details</Button>
                        </Link>
                      </Card>
                    </List.Item>
                  )}
                />
              ))}
            </ul>
            <div dangerouslySetInnerHTML={{ __html: contract?.content! }} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Checkout;
