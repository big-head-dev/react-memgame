import React, { useState, useMemo, useEffect } from 'react'
import { FisherYatesShuffle } from '../../utils/randomize'

const MemoryGame = () => {
  const levelMultipler = 2
  const cardFront = '❓'
  const content = ['🦁', '🐯', '🐮', '🐷', '🐸', '🐼', '🐰', '🦝']
  const [level, setLevel] = useState(1)
  const [numMoves, setNumMoves] = useState(0)
  const [cards, setCards] = useState([])

  const flippedCardIds = useMemo(() => cards.filter((card) => card.flipped).map((card) => card.id), [cards])
  const matchedCardIds = useMemo(() => cards.filter((card) => card.matched).map((card) => card.id), [cards])
  const gameWon = useMemo(() => matchedCardIds.length === cards.length, [matchedCardIds, cards])

  useEffect(() => {
    initializeGame()
  }, [level])

  useEffect(() => {
    if (flippedCardIds.length >= 2) {
      setNumMoves((prevMoves) => prevMoves + 1)
      const [firstCardId, secondCardId] = flippedCardIds
      if (cards[firstCardId].content === cards[secondCardId].content) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, matched: true, flipped: false }
              : card
          )
        )
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, flipped: false } : card
            )
          )
        }, 750)
      }
    }
    console.log('matchedCardIds', matchedCardIds)
  }, [flippedCardIds])

  const initializeGame = () => {
    //reset the game
    setNumMoves(0)

    //grab the number of content for the current level
    const contentForLevel = [
      ...FisherYatesShuffle(content.slice(0, level * levelMultipler)), //grab the first n content for the level
    ]

    //create the content for the cards
    const shuffledContent = [...contentForLevel, ...contentForLevel].sort(() => Math.random() - 0.5)

    //assign the cards
    setCards(
      shuffledContent.map((content, index) => ({
        id: index,
        content,
        flipped: false,
        matched: false,
      }))
    )
  }

  const handleChangeLevel = (value) => {
    setLevel((prevLevel) => {
      if (prevLevel + value <= 0) return 1 //never go below level 1
      if ((prevLevel + value) * levelMultipler > content.length) return prevLevel //never go above the multiplier of content available
      return prevLevel + value
    })
  }

  const handleCardFlip = (id) => {
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, flipped: true } : card)))
  }

  return (
    <div className="memory-game">
      <h2>Memory Game</h2>
      <div className="level">
        Level {level} <button onClick={() => handleChangeLevel(1)}>⬆️</button>
        <button onClick={() => handleChangeLevel(-1)}>⬇️</button>
      </div>
      <div className="moves">Moves: {numMoves}</div>
      <div className="game-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() =>
              flippedCardIds.length < 2 && !card.flipped && !card.matched && handleCardFlip(card.id)
            }>
            {card.flipped || card.matched ? card.content : cardFront}
          </div>
        ))}
      </div>
      {gameWon && (
        <div className="congratulations">
          Congratulations! You've matched all the cards!{' '}
          <button onClick={initializeGame}>🚀 Play Again</button>
        </div>
      )}
    </div>
  )
}

export default MemoryGame
