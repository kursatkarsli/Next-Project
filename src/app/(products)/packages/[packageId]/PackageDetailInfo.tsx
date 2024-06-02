'use client'
import { Typography } from 'antd'
import styles  from './DetailPackage.module.css'

function PackageDetailInfo({detail}:{detail: string}) {
  return (
    <Typography.Paragraph className={styles.paragraph}>
        {detail}
    </Typography.Paragraph>
)
}

export default PackageDetailInfo