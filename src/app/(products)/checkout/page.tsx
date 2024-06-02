// app/checkout/page.tsx
"use client";
import { useEffect, useState } from "react";

import {
  useCheckoutMutation,
  useGetContractQuery,
} from "@/redux/slices/apiSlice";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import ReactInputMask from "react-input-mask";
import PackagesInBasket from "../packages/[packageId]/PackagesInBasket";
import styles from "./Checkout.module.css";
const { Header, Content } = Layout;
type CardInfo = {
  cardNumber: string;
  cardHolderName: string;
  expireDate: string;
  cvv: string;
};
const Checkout = () => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: "",
    cardHolderName: "",
    expireDate: "",
    cvv: "",
  });

  const [checkout, { isLoading }] = useCheckoutMutation();
  const { data: contract } = useGetContractQuery();
  const [selectedPackages, setSelectedPackages] = useState<
    {
      _id: string;
      name: string;
      price: number;
      currency: string;
    }[]
  >([]);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const totalAmount = selectedPackages.reduce((acc: number, curr: any) => {
      return (acc += curr.price);
    }, 0);
    const packageIds = selectedPackages.map((packages) => packages._id);
    const postData = {
      ...values,
      totalAmount,
      currency: selectedPackages[0]?.currency,
      packageIds
    };

    try {
      await checkout(postData).unwrap();
      router.push("/result");
    } catch (err) {
      message.error("Payment failed. Please try again.");
    }
  };
  const handleInput = (event: any) => {
    const { name, value } = event.target;

    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };
  useEffect(() => {
    const packages = JSON.parse(
      localStorage.getItem("selectedPackages") || "[]"
    );
    setSelectedPackages(packages);
  }, []);
  const aggrement = decodeURIComponent(contract?.content!);
  return (
    <Row justify={"center"} gutter={12} style={{ marginTop: "1rem" }}>
      <Col span={12}>
        <Card className={styles.detailCard} title={`Kart Bilgileri`}>
          <Row>
            <Col span={24}>
              <Form name="checkout" onFinish={onFinish} id="checkoutForm">
                <Col span={24}>
                  <Form.Item
                    name="cardHolderName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Fullname!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="FullName"
                      name="cardHolderName"
                      onInput={handleInput}
                      value={cardInfo.cardHolderName}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row justify={"space-between"}>
                    <Col span={8}>
                      <Form.Item
                        name="cardNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your Card Number!",
                          },
                        ]}
                      >
                        <ReactInputMask
                          mask="9999 9999 9999 9999"
                          maskChar=" "
                          value={cardInfo.cardNumber}
                          onChange={handleInput}
                        >
                          {
                            //@ts-ignore
                            (inputProps) => (
                              <Input
                                {...inputProps}
                                placeholder="Card Number"
                                name="cardNumber"
                              />
                            )
                          }
                        </ReactInputMask>
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        name="expireDate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the expiry date!",
                          },
                        ]}
                      >
                        <ReactInputMask
                          mask="99/99"
                          maskChar=" "
                          value={cardInfo.expireDate}
                          onChange={handleInput}
                        >
                          {
                            //@ts-ignore
                            (inputProps) => (
                              <Input
                                {...inputProps}
                                placeholder="Expiry Date (MM/YY)"
                                name="expireDate"
                              />
                            )
                          }
                        </ReactInputMask>
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        name="cvv"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the cvv!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="cvv"
                          name="cvv"
                          type={"password"}
                          value={cardInfo.cvv}
                          onChange={handleInput}
                          maxLength={3}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Col>
            <Col span={24}>
              {" "}
              <Typography.Text strong>Sözleşme</Typography.Text>{" "}
            </Col>
            <Col span={24}>
              <Typography.Paragraph strong className={styles.paragraph}>
                <div dangerouslySetInnerHTML={{ __html: aggrement }} />
              </Typography.Paragraph>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          className={styles.detailCard}
          styles={{
            body: {
              padding: 0,
            },
          }}
          title={"Sepetteki Paketler"}
        >
          <Row>
            <Col span={24}>
              <Row
                justify={"space-between"}
                style={{ width: "100%", marginTop: "0.8rem", gap: "0.5rem" }}
              >
                {selectedPackages?.map((packages: any) => (
                  <Col span={24} key={packages._id}>
                    <PackagesInBasket
                      packageName={packages.name}
                      price={`${packages.price} ${packages.currency}`}
                    />
                  </Col>
                ))}
                <Col span={24}>
                  <Button
                    size="large"
                    style={{ width: "100%" }}
                    type="primary"
                    form="checkoutForm"
                    htmlType="submit"
                  >
                    Ödeme Yap{" "}
                  </Button>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
