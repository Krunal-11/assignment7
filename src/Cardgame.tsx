import React from 'react';
import { useState, useEffect } from 'react';
import './Cardgame.css'

type Card = {
    id:number;
    value:number;
    revealed:boolean;
    matched:boolean;
}

type GameState = {
    cards:Card[];
    disableClick:boolean;
    firstnumber:number | null;
    secondnumber: number | null;
}


const Cardgame = () =>{
    const [gameState, setGameState] = useState<GameState>(
        {
            cards:[],
            disableClick:false,
            firstnumber:null,
            secondnumber:null
        }
    );



    const shuffler= (boardsize : number): Card[] =>{
        let cards : Card[]= [];
        for(let i =1;i<=boardsize;i++)
        {
            cards.push({id: i*2-1, value:i, revealed:false, matched:false })
            cards.push({id: i*2, value:i, revealed:false, matched:false })
        }
        for(let i=cards.length-1;i>0;i--)
        {
            const random = Math.floor(Math.random()* (i+1));
            [cards[i],cards[random]] = [cards[random],cards[i]];
        }
        return cards;
    }

    useEffect(()=>{
        const shuffledCards = shuffler(8);
        setGameState((prevState) =>
            ({...prevState, cards:shuffledCards})
        )
    },[]);

    const handleCardClick = (index: number) => {
    if (gameState.disableClick || gameState.cards[index].revealed || gameState.cards[index].matched) {
        return;
    }

    // Reveal the clicked card
    const updatedCards = revealCard(index);

    if (gameState.firstnumber === null) {
        // If it's the first card clicked
        setGameState(prevState => ({
            ...prevState,
            cards: updatedCards,
            firstnumber: index,
        }));
    } else {
        // If it's the second card clicked
        setGameState(prevState => ({
            ...prevState,
            cards: updatedCards,
            secondnumber: index,
            disableClick: true, // Disable further clicks until we process the match
        }));

        checkForMatch(updatedCards, index);
    }
};

// Helper function to reveal a card
const revealCard = (index: number): Card[] => {
    return gameState.cards.map((card, i) =>
        i === index ? { ...card, revealed: true } : card
    );
};

// Helper function to check if two cards match
const checkForMatch = (updatedCards: Card[], secondCardIndex: number) => {
    const firstCardIndex = gameState.firstnumber;
    const isMatch = updatedCards[firstCardIndex!].value === updatedCards[secondCardIndex].value;

    if (isMatch) {
        // If the cards match, update their 'matched' status
        const matchedCards = updatedCards.map((card, i) => {
            if (i === firstCardIndex || i === secondCardIndex) {
                return { ...card, matched: true };
            }
            return card;
        });

        setGameState(prevState => ({
            ...prevState,
            cards: matchedCards,
            firstnumber: null,
            secondnumber: null,
            disableClick: false,
        }));
    } else {
        // If the cards don't match, hide them after a timeout
        setTimeout(() => {
            const resetCards = updatedCards.map((card, i) => {
                if (i === firstCardIndex || i === secondCardIndex) {
                    return { ...card, revealed: false };
                }
                return card;
            });

            setGameState(prevState => ({
                ...prevState,
                cards: resetCards,
                firstnumber: null,
                secondnumber: null,
                disableClick: false,
            }));
        }, 300);
    }
};



    return (
        <div className="game-container">
      <h1>Memory Card Game</h1>
      <div className='card-container'>
    <div className="card-grid">
        
      {gameState.cards.map((card, index) => (
        <div
          key={card.id}
          className={`card ${card.revealed ? "revealed" : ""} ${card.matched ? "matched" : ""}`}
          onClick={() => handleCardClick(index)} // Handle card click
        >
            
          {card.revealed || card.matched ? card.value : "?"} {/* Show card value if revealed or matched */}
        </div>
      ))}
    </div>
    </div>
  </div>
);

}

export default Cardgame;