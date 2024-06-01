// app/result/page.tsx
'use client'
import { useRouter } from 'next/navigation';
import { Button } from 'antd';

const Result = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem', textAlign: 'center' }}>
      <h1>Payment Successful</h1>
      <p>Your payment has been processed successfully.</p>
      <Button type="primary" onClick={handleHome}>
        Go to Home
      </Button>
    </div>
  );
};

export default Result;
