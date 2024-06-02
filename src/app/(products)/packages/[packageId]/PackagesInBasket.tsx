'use client'
import { Row, Col, Typography } from 'antd';
import styles from './DetailPackage.module.css'
function PackagesInBasket({
  packageName,
  price,
}: {
  packageName: string;
  price: string;
}) {
  return (
    <Row justify={'space-between'} className={styles.checkoutCardPackageListItem}>
      <Col span={16}><Typography.Text>{packageName}</Typography.Text></Col>
      <Col span={3}><Typography.Text strong>{price}</Typography.Text></Col>
    </Row>
  );
}

export default PackagesInBasket;
