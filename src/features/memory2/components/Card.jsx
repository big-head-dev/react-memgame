const Card = (card, canFlip, handleCardFlip) => {
  return (
    <div
      key={card.id}
      className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
      onClick={() => canFlip && handleCardFlip(card.id)}>
      {card.flipped || card.matched ? card.content : cardFront}
    </div>
  )
}

export default Card
