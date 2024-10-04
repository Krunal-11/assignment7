// Card.tsx

import React from 'react';

// Define the type for CardProps
type CardType = {
  id: number;
  value: string; // or `number` if you're using numbers instead
  isFlipped: boolean;
  isMatched: boolean;
};

type CardProps = {
  card: CardType;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <button
      className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={onClick}
      disabled={card.isFlipped || card.isMatched}
    >
      {card.isFlipped || card.isMatched ? card.value : '❓'}
    </button>
  );
};

export default Card;
