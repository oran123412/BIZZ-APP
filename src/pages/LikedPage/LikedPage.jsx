import React, { useContext, useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import CardComponent from "../../components/CardComponent";
import ROUTES from "../../routes/ROUTES";
import LoginContext from "../../store/loginContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const LikedPage = () => {
  const [userLikedCards, setUserLikedCards] = useState([]);
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { login } = useContext(LoginContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/cards");
        const allCards = response.data;

        const likedCards = allCards.filter((item) => {
          const userId = login ? login._id : undefined;
          const isLiked = item.likes.includes(userId);
          return isLiked;
        });

        setUserLikedCards(likedCards);
        setDataFromServer(allCards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [login]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!userLikedCards.length) {
    return <Typography>No liked cards found.</Typography>;
  }

  const handleDeleteCard = (id) => {
    setUserLikedCards((prevLikedCards) =>
      prevLikedCards.filter((card) => card._id !== id)
    );

    setDataFromServer((currentDataFromServer) =>
      currentDataFromServer.filter((card) => card._id !== id)
    );
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleLikeCard = async (id) => {
    try {
      await axios.patch("/cards/" + id);
      setUserLikedCards((prevLikedCards) =>
        prevLikedCards.filter((card) => card._id !== id)
      );
      setDataFromServer((cDataFromServer) =>
        cDataFromServer.map((card) =>
          card._id === id ? { ...card, liked: !card.liked } : card
        )
      );
    } catch (err) {}
  };

  const handleCardClick = (id) => {
    navigate(`${ROUTES.BUSINESSDETAIL}/${id}`);
  };

  const handleCallclick = (id) => {
    const card = dataFromServer.find((item) => item._id === id);

    if (card && card.phone) {
      toast.info(`Call now to: ${card.phone}`);
      const updatedData = dataFromServer.map((item) =>
        item._id === id ? { ...item, called: true } : item
      );
      setDataFromServer(updatedData);
    } else {
      console.error(`Item with id ${id} not found or has no phone number.`);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" sx={{ textDecoration: "underline" }}>
          Your Liked Cards
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {userLikedCards.map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={`likedCard${index}`}>
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
              defaultColor="error"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LikedPage;
