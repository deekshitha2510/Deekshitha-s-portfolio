import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '../path-to-your-animation.json';

const AnimationLottie = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR errors

  return <Lottie animationData={animationData} loop={true} />;
};

export default AnimationLottie;
