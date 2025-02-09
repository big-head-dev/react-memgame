export const Card = ({ card, canFlip, onCardFlip }) => {
  return (
    <div
      key={card.id}
      className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
      onClick={() => canFlip && onCardFlip(card.id)}>
      {card.flipped || card.matched ? card.content : '❓'}
    </div>
  )
}
