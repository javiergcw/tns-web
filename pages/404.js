// pages/404.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl">Redireccionando a la página principal...</h1>
    </div>
  );
};

export default Custom404;
