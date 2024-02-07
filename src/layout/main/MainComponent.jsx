import { Container } from "@mui/material";
import PropType from "prop-types";
const MainComponent = ({ children }) => {
  return <Container>{children}</Container>;
};
export default MainComponent;

MainComponent.propType = {
  children: PropType.element.isRequired,
};
