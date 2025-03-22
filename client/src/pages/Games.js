import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const CARD_PAIRS = [
  { id: 1, emoji: '🌟' },
  { id: 2, emoji: '🎮' },
  { id: 3, emoji: '🎲' },
  { id: 4, emoji: '🎯' },
  { id: 5, emoji: '🎪' },
  { id: 6, emoji: '🎨' },
  { id: 7, emoji: '🎭' },
  { id: 8, emoji: '🎪' },
];

const Games = () => {
  const { addPoints } = useAuth();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards and shuffle them
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
  };

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        setSolved([...solved, firstIndex, secondIndex]);
        setFlipped([]);
        setDisabled(false);
        // Award points for matching pair
        addPoints(10);

        // Check if game is complete
        if (solved.length + 2 === cards.length) {
          // Award bonus points for completing the game
          addPoints(50);
          setTimeout(() => {
            alert('Congratulations! You completed the game! +50 bonus points!');
            initializeGame();
          }, 500);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Memory Game</h2>
        <p className="text-gray-600 mb-4">
          Match pairs of cards to earn points! Each match is worth 10 points, and completing the game gives you a 50-point bonus.
        </p>
        <button
          onClick={initializeGame}
          className="btn-primary"
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
        {cards.map((card, index) => (
          <div
            key={card.uniqueId}
            onClick={() => handleCardClick(index)}
            className={`
              aspect-square flex items-center justify-center text-3xl
              rounded-lg cursor-pointer transform transition-all duration-300
              ${flipped.includes(index) || solved.includes(index)
                ? 'bg-white rotate-0'
                : 'bg-primary-600 rotate-180'
              }
              ${disabled ? 'pointer-events-none' : ''}
              hover:scale-105
            `}
          >
            <div
              className={`
                transform transition-all duration-300
                ${flipped.includes(index) || solved.includes(index)
                  ? 'rotate-0'
                  : 'rotate-180'
                }
              `}
            >
              {(flipped.includes(index) || solved.includes(index)) && card.emoji}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
