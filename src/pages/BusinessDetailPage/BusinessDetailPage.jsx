import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

const BusinessDetailPage = () => {
  const defaultLat = 32.0853;
  const defaultLng = 34.7818;
  const params = useParams();
  const id = params.id;
  const [selectedCard, setSelectedCard] = useState(null);
  const [position, setPosition] = useState(null);
  const customMarkerIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerIconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const fetchCityCoordinates = async (city) => {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
      city
    )}&format=json&limit=1`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return [defaultLat, defaultLng];
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      return [defaultLat, defaultLng];
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/cards/${id}`)
        .then(({ data }) => {
          setSelectedCard(data);
          if (data.address.location) {
            setPosition([data.address.location.lat, data.address.location.lng]);
          } else if (data.address.city) {
            fetchCityCoordinates(data.address.city).then((cityCoords) => {
              setPosition(cityCoords);
            });
          } else {
            setPosition([defaultLat, defaultLng]);
          }
        })
        .catch((error) => {
          console.error("Error fetching card details:", error);
          setPosition([defaultLat, defaultLng]);
        });
    }
  }, [id]);

  if (!selectedCard) {
    return <div>Loading card details...</div>;
  }

  return (
    <div>
      <h1>{selectedCard.title}</h1>
      <p>
        {selectedCard.address.street}, {selectedCard.address.city},{" "}
        {selectedCard.address.state} {selectedCard.address.zip}
      </p>
      <img
        src={selectedCard.image.url}
        alt={selectedCard.image.alt}
        style={{ maxWidth: "400px", maxHeight: "500px" }}
      />
      <p>
        <strong>Subtitle:</strong> {selectedCard.subtitle}
      </p>
      <p>
        <strong>Description:</strong> {selectedCard.description}
      </p>
      <p>
        <strong>Phone:</strong> {selectedCard.phone}
      </p>
      <p>
        <strong>Email:</strong> {selectedCard.email}
      </p>
      <p>
        <strong>Web:</strong> {selectedCard.web}
      </p>
      <p>
        <strong>Biz Number:</strong> {selectedCard.bizNumber}
      </p>

      {position && (
        <MapContainer
          center={position}
          zoom={15}
          style={{ width: "100%", height: "400px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          />
          <Marker position={position} icon={customMarkerIcon}>
            <Popup>{selectedCard.title}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default BusinessDetailPage;
