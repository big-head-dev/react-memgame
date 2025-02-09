export const StatusBar = ({ title, currentLevel, numOfMoves, onChangeLevel }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="level">
        Level {currentLevel} <button onClick={() => onChangeLevel(1)}>⬆️</button>
        <button onClick={() => onChangeLevel(-1)}>⬇️</button>
      </div>
      <div className="moves">Moves: {numOfMoves}</div>
    </div>
  )
}
