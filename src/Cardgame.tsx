import React from 'react';
import { useState, useEffect } from 'react';

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
        for(let i=cards.length;i>0;i--)
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


    return (
        <div className='card-game'>
            {for}
        </div>
    )
}

export default Cardgame;