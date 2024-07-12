// components/PublicRoute.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const PublicRoute = (WrappedComponent) => {
  const ComponentWithPublicRoute = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.replace('/dashboardManager');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPublicRoute;
};

export default PublicRoute;
