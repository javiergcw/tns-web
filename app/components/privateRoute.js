// components/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = (WrappedComponent) => {
  const ComponentWithPrivateRoute = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return null; // O puedes mostrar un spinner de carga aquí
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPrivateRoute;
};

export default PrivateRoute;
