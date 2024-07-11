// components/PrivateRoute.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace("/login");
      }
    }, [router]);

    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };
};

export default PrivateRoute;
