import './cards.styles.css';
import Card from "../card/card.component"

function Cards({games}) {

const cards = []

if(games){
  for(let game of games){
    cards.push(<Card key={game.id} game={game}/>)
  }
}

  return (
    <div className='list-cards'>
      {cards}
    </div>
  );
}

export default Cards;