// app/package/[id]/page.tsx

import { Button, Card, Col, message, Row, Typography } from "antd";
import DetailPackageCheckoutButton from "./DetailPackageCheckoutButton";
import { cookies } from "next/headers";
import Image from "next/image";
import styles from "./DetailPackage.module.css";
import { Content } from "antd/es/layout/layout";
import Tags from "./Tags";
import DetailExplanationTitle from "./DetailExplanationTitle";
import PackageDetailInfo from "./PackageDetailInfo";
import PackagesInBasket from "./PackagesInBasket";
import CheckoutButton from "./CheckoutButton";
const PackageDetail = async (props: any) => {
  const { params } = props;
  const res = await fetch(
    `https://caseapi-fe.paramtech.com.tr/api/packages/${params.packageId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    }
  );
  const data = await res.json();
  const selectedPackages = JSON.parse(
    cookies().get("selectedPackages")!?.value || "[]"
  );

  return (
    <Row justify={"center"} gutter={12} style={{ marginTop: "1rem" }}>
      <Col span={12}>
        <Card
          className={styles.detailCard}
          styles={{
            body: {
              padding: 0,
            },
            header: {
              padding: 0,
            },
          }}
          title={`Paket Detay | ${data.price}${data.currency}`}
          cover={
            <div
              className=""
              style={{ position: "relative", height: "12.20rem" }}
            >
              <Image
                alt="example"
                src={data.imagePath}
                fill
                objectFit="cover"
              />
            </div>
          }
        >
          <Row>
            <Col span={24}>
              <Row
                justify={"space-between"}
                align={'middle'}
                style={{ width: "100%", marginTop: "0.8rem" }}
              >
                <Col span={12}>
                  <DetailExplanationTitle />
                </Col>
                <Col span={10}>
                  <ul className={styles.customListForTags}>
                    {data.tags.map((tag: string, index: number) => (
                      <li key={index} className={styles.customListItemForTag}>
                        <Tags tag={tag} key={index} />
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <PackageDetailInfo detail={data.moreInformation} />
                </Col>
              </Row>
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
            <Col span={24} >
              <Row
                justify={"space-between"}
                style={{ width: "100%", marginTop: "0.8rem", gap:'0.5rem' }}
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
                  <CheckoutButton />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default PackageDetail;
