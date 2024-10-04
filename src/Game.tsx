// Game.tsx

import React, { useState, useEffect } from 'react';
import Card from './Card'; // import the Card component
import './Game.css'

// Define types for Card and GameState
type CardType = {
  id: number;
  value: string; // can also be `number` if you want
  isFlipped: boolean;
  isMatched: boolean;
};

type GameState = {
  cards: CardType[];
  disableClick: boolean;
  firstCardIndex: number | null;
  secondCardIndex: number | null;
};

// Function to generate and shuffle cards
const generateCards = (): CardType[] => {
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // 8 pairs of cards
  const cards: CardType[] = values.concat(values).map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
  
  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  return cards;
};

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: generateCards(),
    disableClick: false,
    firstCardIndex: null,
    secondCardIndex: null,
  });

  // Handle the card click
  const handleCardClick = (index: number) => {
    if (gameState.disableClick || gameState.cards[index].isMatched || gameState.cards[index].isFlipped) {
      return;
    }

    const newCards = [...gameState.cards];
    newCards[index].isFlipped = true;

    if (gameState.firstCardIndex === null) {
      // First card selected
      setGameState({
        ...gameState,
        firstCardIndex: index,
        cards: newCards,
      });
    } else if (gameState.secondCardIndex === null) {
      // Second card selected
      setGameState({
        ...gameState,
        secondCardIndex: index,
        cards: newCards,
        disableClick: true,
      });

      // Delay to allow the user to see both cards before hiding
      setTimeout(() => checkForMatch(index), 1000);
    }
  };

  const checkForMatch = (secondIndex: number) => {
    const firstIndex = gameState.firstCardIndex!;
    const newCards = [...gameState.cards];

    if (newCards[firstIndex].value === newCards[secondIndex].value) {
      // Cards match, mark them as matched
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
    } else {
      // Cards don't match, flip them back
      newCards[firstIndex].isFlipped = false;
      newCards[secondIndex].isFlipped = false;
    }

    // Reset game state for next round
    setGameState({
      cards: newCards,
      disableClick: false,
      firstCardIndex: null,
      secondCardIndex: null,
    });
  };

  return (
    <div className="game-board">
      {gameState.cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Game;
