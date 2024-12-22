import React from "react";
import { IMAGE_BASE_URL } from "../utils/constants";
import "../styles/CastCard.css";

const CastCard = ({ member }) => {
  const fallbackImage = "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="cast-card">
      <img
        src={
          member.profile_path
            ? `${IMAGE_BASE_URL}${member.profile_path}`
            : fallbackImage
        }
        alt={member.name}
        className="cast-card__image"
        onError={(e) => {
          e.target.src = fallbackImage;
        }}
      />
      <div className="cast-card__details">
        <h3 className="cast-card__name">{member.name}</h3>
        <p className="cast-card__character">{member.character}</p>
      </div>
    </div>
  );
};

export default CastCard;
