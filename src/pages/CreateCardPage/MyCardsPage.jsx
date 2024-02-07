import React, { useContext, useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import CardComponent from "../../components/CardComponent";
import LoginContext from "../../store/loginContext";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

const MyCardsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/cards/my-cards");
        const initializedCards = response.data.map((card) => ({
          ...card,
          liked: card.likes.includes(login?._id),
        }));
        setUserCards(initializedCards);
        setDataFromServer(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [login]);

  const handleDeleteCard = async (id) => {
    try {
      const response = await axios.delete(`/cards/${id}`);
      if (response.status === 200) {
        const updatedDataFromServer = dataFromServer.filter(
          (card) => card._id !== id
        );
        const updatedUserCards = userCards.filter((card) => card._id !== id);

        setDataFromServer(updatedDataFromServer);
        setUserCards(updatedUserCards);
      }
    } catch (error) {
      console.error("Error deleting card:", error.message);
    }
  };

  const handleLikeCard = async (id) => {
    try {
      const response = await axios.patch(`/cards/${id}`);

      setUserCards((prevUserCards) =>
        prevUserCards.map((card) =>
          card._id === id
            ? { ...card, liked: response.data.likes.includes(login?._id) }
            : card
        )
      );
    } catch (error) {
      console.error("Error updating like state:", error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`${ROUTES.BUSINESSDETAIL}/${id}`);
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleCallClick = (id) => {
    const cardItem = dataFromServer.find((item) => item._id === id);

    if (cardItem) {
      toast.info(`Call now to: ${cardItem.phone}`);
    } else {
      console.error("Card not found for id:", id);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const handleCreateCard = () => {
    navigate(`${ROUTES.CREATECARD}`);
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" sx={{ textDecoration: "underline" }}>
          Your Created Cards
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {userCards.length > 0 ? (
          userCards.map((item) => (
            <Grid item lg={3} md={6} xs={12} key={item._id}>
              <CardComponent
                id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                img={item.image.url}
                phone={item.phone}
                address={item.address}
                cardNumber={item.bizNumber}
                onDelete={() => handleDeleteCard(item._id)}
                onEdit={() => handleEditCard(item._id)}
                onLike={() => handleLikeCard(item._id)}
                onClick={() => handleCardClick(item._id)}
                onCall={() => handleCallClick(item._id)}
                liked={item.liked}
                userId={item.user_id}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography textAlign="center">No cards found.</Typography>
          </Grid>
        )}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4} mb={3}>
        <Button variant="contained" onClick={handleCreateCard}>
          Create new card!
        </Button>
      </Box>
    </>
  );
};

export default MyCardsPage;
