const blackjackDeck = getDeck();

 /**
  * Represents a card player (including dealer).
  * @constructor
  * @param {string} name - The name of the player
 */
class CardPlayer {
    constructor(name){
        this.name = name;
        this.hand =[];
    }
    drawCard(){
        let randomCard = Math.floor(Math.random()*52);
        this.hand.push(blackjackDeck[randomCard]);
    }
    
}; //TODO

 // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Joker'); // TODO
const player = new CardPlayer('Batman'); // TODO

 /**
  * Calculates the score of a Blackjack hand
  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
  * @returns {Object} blackJackScore
  * @returns {number} blackJackScore.total
  * @returns {boolean} blackJackScore.isSoft
  */

const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
    let total =0;
    let isSoft = false;

    for(let i =0; i<hand.length; i++){
            let cardpoint = parseInt(hand[i].val);
            total += cardpoint
    }

    if(hand.some((cards)=>cards.displayVal === 'Ace')) {
        isSoft = true;
    }

    if(total>21){
        if(isSoft){
            cardAce=hand.filter((card) => card.val === 11)
            for( let i=0;i<cardAce.length;i++){
                total -=10;
            }
            isSoft = false;
        }
    }

    const blackJackScore ={
        total,
        isSoft
    }

    return blackJackScore;
};


 /**
  * Determines whether the dealer should draw another card.
  * 
  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
  * @returns {boolean} whether dealer should draw another card
 */

const dealerShouldDraw = (dealerHand) => {
   // CREATE FUNCTION HERE
    const objDealer = calcPoints(dealerHand);
    let {total, isSoft} = objDealer;

    if(total <=16){
        dealerDraw = true;
    }else if(total === 17 && isSoft === true){
        dealerDraw = true;
    }else if(total >=17){
        dealerDraw =false;
    }

   return dealerDraw;
};


 /**
  * Determines the winner if both player and dealer stand
  * @param {number} playerScore 
  * @param {number} dealerScore 
  * @returns {string} Shows the player's score, the dealer's score, and who wins
 */

const determineWinner = (playerScore, dealerScore) => {
// CREATE FUNCTION HERE

    const strPlayerScore = `The Player's score is` 
    const strDealerScore = `the dealer's score is`

    if(playerScore > dealerScore){
        return `${strPlayerScore} ${playerScore},${strDealerScore} ${dealerScore}, and the winner is Player.`
    }else if(playerScore < dealerScore){
        return `${strPlayerScore} ${playerScore},${strDealerScore} ${dealerScore}, and the winner is Dealer.`
    }else {
        return `It is a tie.`
    }
}

 /**
  * Creates user prompt to ask if they'd like to draw a card
  * @param {number} count 
  * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
   return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

 /**
  * Logs the player's hand to the console
  * @param {CardPlayer} player 
 */

const showHand = (player) => {
    const displayHand = player.hand.map((card) => card.displayVal);

    const h2ShowHand = document.createElement('h2')
    const h2TextNode = document.createTextNode(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`)
    h2ShowHand.appendChild(h2TextNode)
    const newLine = document.createElement('br')

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(h2ShowHand);
    body.appendChild(newLine);

    console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

 /**
  * Runs Blackjack Game
 */
 const startGame = function() {
    player.drawCard();
    dealer.drawCard();
    player.drawCard();
    dealer.drawCard();
   
    let playerScore = calcPoints(player.hand).total;
    showHand(player);
    let dealerScore = calcPoints(dealer.hand).total;
    
   if (playerScore === 21){
    return `Player immediately win`
   }

   if (dealerScore === 21){
    showHand(dealer)
    return `Dealer immediately win`
   }

   while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
     player.drawCard();
     playerScore = calcPoints(player.hand).total;
     showHand(player);
   }
   
   if (playerScore > 21) {
     return 'You went over 21 - you lose!';
   }
   console.log(`Player stands at ${playerScore}`);

   while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
     dealer.drawCard();
     dealerScore = calcPoints(dealer.hand).total;
     showHand(dealer);
   }
   if (dealerScore > 21) {
     return 'Dealer went over 21 - you win!';
   }
   console.log(`Dealer stands at ${dealerScore}`);

   return determineWinner(playerScore, dealerScore);
}

console.log(startGame());