import Card from "./card.component"

function Cards({ games }) {

  const cards = []
  let message = ''

  if (games && games.length) {
    for (let game of games) {
      cards.push(<Card key={game.id} game={game} />)
    }
  } else {
    message = '¡Ups!... No se encontraron resultados'
  }

  return (
    <div className="flex-grid">
      {(!games || !games.length) && (
        <div className="message">{message}</div>
      )}
      {cards}
    </div>
  );
}

export default Cards;