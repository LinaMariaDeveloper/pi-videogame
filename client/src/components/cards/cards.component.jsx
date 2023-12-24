import './cards.style.css';
import Card from "../card/card.component"

function Cards({allGames}) {
  const gameslist = allGames

  return (
    <div>
      {gameslist && gameslist.map(game =>
        <Card game = {game}/>)}
    </div>
  );
}

export default Cards;