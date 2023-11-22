import React, { useState, useEffect } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GameBoard } from './GameBoard';
import { SizeSelector } from './SizeSelector';

type CardType = {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function App(): ReactJSXElement {
  const [size, setSize] = useState(4); // A tábla mérete
  const [cards, setCards] = useState<CardType[]>([]); // A kártyák állapota
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]); // Felfordított kártyák
  const [matchedPairs, setMatchedPairs] = useState<number>(0); // Talált párok száma
  const [moves, setMoves] = useState<number>(0); // Lépések száma

  const generateCards = () => {
    const totalPairs = (size * size) / 2;
    const newCards: CardType[] = [];
    for (let i = 0; i < totalPairs; i++) {
      const id = Math.floor(Math.random() * 1000); // Véletlenszerű ID a Picsum API-hoz
      const imageUrl = `https://picsum.photos/id/${id}/200/300`;

      // Kétszer hozzáadjuk minden kártyát
      newCards.push({ id: id * 2, imageUrl, isFlipped: false, isMatched: false });
      newCards.push({ id: id * 2 + 1, imageUrl, isFlipped: false, isMatched: false });
    }

    // Kártyák összekeverése
    newCards.sort(() => Math.random() - 0.5);

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  // Kártyák generálása
  useEffect(() => {
    generateCards();
  }, [size]);

  const checkForMatch = () => {
    let newCards = [...cards];
    let matches = matchedPairs;

    if (flippedCards[0].imageUrl === flippedCards[1].imageUrl) {
      matches++;
      newCards = newCards.map((card) => {
        if (card.imageUrl === flippedCards[0].imageUrl) {
          return { ...card, isMatched: true };
        }
        return card;
      });
    } else {
      newCards = newCards.map((card) => {
        if (card.isFlipped && !card.isMatched) {
          return { ...card, isFlipped: false };
        }
        return card;
      });
    }

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(matches);
    setMoves(() => moves + 1);
  };

  // Kártyára kattintás kezelése
  const handleCardClick = (id: number): void => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, isFlipped: true };
      }
      return card;
    });

    setCards(newCards);

    const flipped = newCards.filter((card) => card.isFlipped && !card.isMatched);
    setFlippedCards(flipped);

    if (flipped.length === 2) {
      setTimeout(() => checkForMatch(), 1000);
    }
  };

  return (
    <div>
      <SizeSelector onStart={(selectedSize) => setSize(selectedSize)} />
      <GameBoard size={size} cards={cards} onCardClick={handleCardClick} />
      <div>
        Lépések száma: {moves}
        <br />
        Talált párok száma: {matchedPairs}
      </div>
    </div>
  );
}
