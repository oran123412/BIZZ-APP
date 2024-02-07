import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AboutUsPage from "./../pages/AboutUsPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import BizGuard from "../guard/BizGuard";
import BusinessDetailPage from "../pages/BusinessDetailPage/BusinessDetailPage";
import CreateCardPage from "../pages/CreateCardPage/CreateCardPage";
import LikedPage from "../pages/LikedPage/LikedPage";
import MyCardsPage from "../pages/CreateCardPage/MyCardsPage";
import NotFoundPage from "../pages/NotFoundPage";
import Sandbox from "../sandbox/Sandbox";
const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.CREATECARD} element={<CreateCardPage />} />
      <Route
        path={`${ROUTES.BUSINESSDETAIL}/:id`}
        element={<BusinessDetailPage />}
      />
      <Route path={ROUTES.LIKEDPAGE} element={<LikedPage />} />
      <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path={ROUTES.SANDBOX} element={<Sandbox />} />

      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
    </Routes>
  );
};
export default Router;
