import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {

  
   
  // Creo un array vuoto di lunghezza 5 con elemento vuoto(_) e indice
  const tempStars = Array.from({length: 5}, (_,index) => {
    // A ogni iterazione number prende il valore di index + 0.5
    // Quindi se è 0 va a 0.5, 1 diventa 1.5
    const number = index + 0.5;
    return (
      <span key={index}>
        
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      
      <div className="stars">
        {tempStars}
      </div>

      <p className="reviews">({reviews}) customer reviews</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
