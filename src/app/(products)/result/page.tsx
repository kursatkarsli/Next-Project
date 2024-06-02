import { Button, Result } from "antd";
import Link from "next/link";
import styles from './Result.module.css'
const App: React.FC = () => (
  <div className={styles.resultContainer}>
    <Result
    className={styles.resultCard}
      status="success"
      title="Başarıyla Tamamlandı!"
      extra={[
        <Button type="primary" key={'Result Button'}>
          <Link href={"/"}>Anasayfaya Dön</Link>
        </Button>,
      ]}
    />
  </div>
);

export default App;
