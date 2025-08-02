import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user, isLoading } = useAuth0();
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (!isLoading && user?.sub && user?.email && !hasCreatedUser.current) {
      hasCreatedUser.current = true;

      createUser({
        auth0Id: user.sub,
        email: user.email,
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Failed to create user:", error);
          hasCreatedUser.current = false;
        });
    }
  }, [user, createUser, navigate, isLoading]);

  return <div>Loading...</div>;
};

export default AuthCallbackPage;
