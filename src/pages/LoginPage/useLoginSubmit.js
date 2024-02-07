import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import LoginContext from "../../store/loginContext";
import ROUTES from "../../routes/ROUTES";

const useLoginSubmit = () => {
  const navigate = useNavigate();
  const { setLogin } = useContext(LoginContext);

  const handleSubmit = async (emailValue, passwordValue, setErrorsCallback) => {
    const emailAttemptsKey = `${emailValue}_failedAttempts`;
    const emailBlockTimeKey = `${emailValue}_blockTime`;
    const failedAttempts = parseInt(
      localStorage.getItem(emailAttemptsKey) || "0"
    );
    const lastAttemptTime = parseInt(
      localStorage.getItem(emailBlockTimeKey) || "0"
    );
    const currentTime = new Date().getTime();
    const MAX_LOGIN_ATTEMPTS = 3;
    const LOGIN_BLOCK_TIME = 24 * 60 * 60 * 1000;

    if (
      failedAttempts >= MAX_LOGIN_ATTEMPTS &&
      currentTime - lastAttemptTime < LOGIN_BLOCK_TIME
    ) {
      toast.error(
        "Too many failed attempts with this email. Please try again in 24 hours."
      );
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      localStorage.setItem("token", data);
      setLogin(jwtDecode(data));
      toast.success("LoggedIn Successfully");
      navigate(ROUTES.HOME);
      localStorage.setItem(emailAttemptsKey, "0");
      localStorage.removeItem(emailBlockTimeKey);
    } catch (err) {
      const updatedFailedAttempts = failedAttempts + 1;
      localStorage.setItem(emailAttemptsKey, updatedFailedAttempts.toString());
      localStorage.setItem(emailBlockTimeKey, currentTime.toString());
      toast.error("Login failed. Please check your email/password.");
      setErrorsCallback(err);
    }
  };

  return handleSubmit;
};

export default useLoginSubmit;
