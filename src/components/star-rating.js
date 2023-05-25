import { useState } from "react";
import styled from "styled-components";

const StyledStarContainer = styled.div`
  font-size: 24px;
`;

const StyledStar = styled.span`
  display: inline-block;
  cursor: pointer;
  transition: color 0.2s;

  &.filled {
    color: orange;
  }
`;

export const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (rating) => {
    onRatingChange(rating);
  };

  return (
    <StyledStarContainer>
      {[1, 2, 3, 4, 5].map((star) => (
        <StyledStar
          key={star}
          className={`star ${
            star <= (hoveredRating || rating) ? "filled" : ""
          }`}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}>
          &#9733;
        </StyledStar>
      ))}
    </StyledStarContainer>
  );
};
