import React, { useContext, useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import lottie from "lottie-web";
import Box from "@mui/material/Box";
import animationData5 from "./AnimationWelcome.json";
import { SearchContext } from "../../store/searchContext";
import normalizeHome from "./normalizeHome";
import LoginContext from "../../store/loginContext";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mui/material";

const MyLottieAnimation5 = () => {
  const animationContainerRef = useRef(null);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    if (animationContainerRef.current && !matches) {
      const anim = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData5,
      });

      return () => anim.destroy();
    }
  }, [matches]);

  if (matches) return null;

  return (
    <div
      style={{
        position: "relative",
        zIndex: -1,
        margin: "-190px 0",
        overflow: "hidden",
      }}
      ref={animationContainerRef}
    />
  );
};

const HomePage = () => {
  const { search } = useContext(SearchContext);
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setDataFromServer(normalizeHome(data));
      })
      .catch((err) => {});
  }, []);

  const dataFromServerFiltered = normalizeHome(
    dataFromServer
      .filter((item) => item.title.toLowerCase().includes(search))
      .map((item) => ({
        ...item,
        liked: item.likes.includes(login ? login._id : undefined),
      })),
    login ? login._id : undefined
  );

  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleDeleteCard = async (id) => {
    try {
      const response = await axios.delete("/cards/" + id);

      if (response.status === 200) {
        setDataFromServer((currentDataFromServer) =>
          currentDataFromServer.filter((card) => card._id !== id)
        );
      } else {
        console.error(
          "Error deleting card. Server response:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting card:", error.message);
    }
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleLikeCard = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);

      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex !== -1) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
    } catch (err) {}
  };

  const handleCardClick = (id) => {
    navigate(`${ROUTES.BUSINESSDETAIL}/${id}`);
  };
  const handleCallclick = (id) => {
    toast.info(
      `Call now to : ${dataFromServer.find((item) => item._id === id).phone} `
    );
    const updatedData = dataFromServer.map((item) =>
      item._id === id ? { ...item, called: true } : item
    );
    setDataFromServer(updatedData);
  };

  return (
    <>
      <MyLottieAnimation5 />

      <Box
        className="custom-box"
        textAlign="center"
        mt={15}
        mb={5}
        sx={{ textDecoration: "underline" }}
      >
        <Typography variant="h4">Today's Deals</Typography>
      </Box>

      <Grid container spacing={2}>
        {dataFromServerFiltered.map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={"carsCard" + index}>
            <CardComponent
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              phone={item.phone}
              address={item.address}
              cardNumber={item.bizNumber}
              liked={item.liked}
              onDelete={handleDeleteCard}
              onEdit={handleEditCard}
              onLike={handleLikeCard}
              onClick={handleCardClick}
              onCall={handleCallclick}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
