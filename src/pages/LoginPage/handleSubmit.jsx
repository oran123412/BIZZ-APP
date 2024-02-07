import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const handleSubmit = async (
  e,
  {
    emailValue,
    passwordValue,
    setLogin,
    navigate,
    MAX_LOGIN_ATTEMPTS,
    LOGIN_BLOCK_TIME,
  }
) => {
  e.preventDefault();
  const emailAttemptsKey = `${emailValue}_failedAttempts`;
  const emailBlockTimeKey = `${emailValue}_blockTime`;
  const failedAttempts = parseInt(
    localStorage.getItem(emailAttemptsKey) || "0"
  );
  const lastAttemptTime = parseInt(
    localStorage.getItem(emailBlockTimeKey) || "0"
  );
  const currentTime = new Date().getTime();
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
    let { data } = await axios.post("/users/login", {
      email: emailValue,
      password: passwordValue,
    });
    localStorage.setItem("token", data);
    const userInfoFromToken = jwtDecode(data);
    setLogin(userInfoFromToken);
    toast.success("LoggedIn Successfully");
    navigate(ROUTES.HOME);
    localStorage.setItem(emailAttemptsKey, "0");
    localStorage.removeItem(emailBlockTimeKey);
  } catch (err) {
    const updatedFailedAttempts = failedAttempts + 1;
    localStorage.setItem(emailAttemptsKey, updatedFailedAttempts.toString());
    localStorage.setItem(emailBlockTimeKey, currentTime.toString());
    toast.error("Login failed. Please check your email/password.");
  }
};

export default handleSubmit;
