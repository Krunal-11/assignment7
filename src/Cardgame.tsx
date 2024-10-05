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

    const handleCardClick = (index : number)=>{
        if(gameState.disableClick || gameState.cards[index].revealed || gameState.cards[index].matched)
            return ;

        const updatedCards = [...gameState.cards];
        updatedCards[index].revealed = true;

        if(gameState.firstnumber == null)
        {
            setGameState( (prevState)=>({
                    ...prevState,
                    cards:updatedCards,
                    firstnumber:index,
                }));
        }
        else if(gameState.secondnumber === null)
        {
            const newGameState = {
                ...gameState,
                cards:updatedCards,
                disableClick : true,
                secondnumber:index,
            };
            const isMatch =  updatedCards[gameState.firstnumber].value === updatedCards[index].value;
            if(isMatch)
            {
                const matchedCards = updatedCards.map((card,i)=>{
                    if(i === newGameState.firstnumber || i === newGameState.secondnumber)
                    {
                        return {...card,matched:true};
                    }
                    return card;
                })

                setGameState({
                    ...newGameState,
                    cards:matchedCards,
                    firstnumber:null,
                    secondnumber:null,
                    disableClick:false
                });
            }
            else{
                setTimeout( ()=>{
                    const cards = newGameState.cards;
                    const resetcards = cards.map((card,i)=>{
                        if(i == newGameState.firstnumber || i === newGameState.secondnumber)
                            return {...card, revealed:false}
                        else
                            return card;
                        // i === newGameState.firstnumber || i === newGameState.secondnumber ? {...card, revealed:false} : card
                    });
                    setGameState({
                        ...newGameState,
                        cards: resetcards,
                        firstnumber:null,
                        secondnumber:null,
                        disableClick:false,
                    });
                }, 1000)
            }
        }      
    }; 


    return (
  <div className="game-container">
    <h1>Memory Card Game</h1>
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
);

}

export default Cardgame;