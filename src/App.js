import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './compoments/SingleCard';

const cardImages = [
  { "src": "/img/Kora.png", matched: false },
  { "src": "/img/Valha.png", matched: false },
  { "src": "/img/Theri.png", matched: false },
  { "src": "/img/Waldron.png", matched: false },
  { "src": "/img/Kudo.png", matched: false },
  { "src": "/img/Gelena.png", matched: false },
  { "src": "/img/Era.png", matched: false },
  { "src": "/img/Aveline.png", matched: false },
  { "src": "/img/Krurlas.png", matched: false },
  { "src": "/img/Mundo.png", matched: false },
  { "src": "/img/Maha.png", matched: false },
  { "src": "/img/Tucka.png", matched: false },
  { "src": "/img/Elicia.png", matched: false },
  { "src": "/img/Bussiness.png", matched: false },
  { "src": "/img/Hunter.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
    }

    // handle choice
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // check 2 cards 
    useEffect(() => {
      if(choiceOne && choiceTwo) {
        setDisabled(true)
        if(choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
            })
          })
          resetTurn()
        }
        else {
          setTimeout(() => resetTurn(), 1000); 
        }
      }
    }, [choiceOne, choiceTwo])

    // reset and +1 turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }

    // Start game auto
    useEffect(() => {
      shuffleCards()
    }, [])
    
  return (
    <div className="App">
      <h1>Trò chơi</h1>
      <button onClick={shuffleCards}>Game mới</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Lượt: {turns}</p>
    </div>
  );
}

export default App;
