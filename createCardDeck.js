/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const deck = []
  const suits = ['hearts', 'spades', 'clubs', 'diamonds']

  for (let i = 0; i < suits.length; i++) {
    // create an array of 13 objects
    for (let j = 1; j <= 13; j++) {
      // for each loop, push a card object to the deck
      let val =0
      let displayVal = ''
      
      if (j === 1){
        val = 11,
        displayVal = 'Ace'
      }else if (j === 11){
        val = 10,
        displayVal = 'Jack'
      }else if (j === 12){
        val = 10,
        displayVal = 'Queen'
      }else if (j === 13){
        val = 10,
        displayVal = 'King'
      }else{
        val = j,
        displayVal = j.toString()
      }

      const card = {
        val: val,
        displayVal: displayVal,
        suit: suits[i],
      }

      deck.push(card)
    }
  }
  return deck;
}

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)


