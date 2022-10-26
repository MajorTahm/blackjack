/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-useless-constructor */
import { Container, Loader, Resource, Sprite, Texture, Text, TextStyle } from "pixi.js";
import { CardRank, CardSuit, Target } from "../types";
import Card from "./Card";


export default class Board extends Container {
    playerHand = new Container();

    dealerHand = new Container();
    
    private loader: Loader;

    cardsInPlayerHand: Card[] = [];

    cardsInDeck: Card[] = [];

    cardsInDealerHand: Card[] = [];

    cardsInDiscardPile: Card[] = [];

    deck: Sprite;

    bank: number;

    bankText: Text;

    bet: number;

    betText: Text;

    startGameButton: Sprite;

    raiseBetButton: Sprite;

    confirmBetButton: Sprite;

    hitButton: Sprite;

    standButton: Sprite;

    roundInPlay: boolean;

    resetBoard: Sprite;

    nextRoundButton: Sprite;

    constructor(loader: Loader){
        super()
        this.loader = loader;
        this.roundInPlay = false;

        // render hands and deck
        this.addChild(this.playerHand);
        this.addChild(this.dealerHand);
        this.playerHand.setTransform(0, 300);
        this.dealerHand.setTransform(0, -300)
        this.deck = new Sprite(loader.resources.back.texture as Texture<Resource>);
        this.deck.setTransform(600, -300);
        this.addChild(this.deck);

        // set and render bank and bet amount
        this.bank = 0;
        this.bankText = new Text('Bank: 0');
        this.bankText.style = new TextStyle({
            fill: 0xFFFFFF,
        });
        this.bankText.setTransform(-400, -100);
        this.addChild(this.bankText);

        this.bet = 0;
        this.betText = new Text('Bet: 0');
        this.betText.style = new TextStyle({
            fill: 0xFFFFFF,
        });
        // decrease bet todo
        this.betText.interactive = !this.roundInPlay;
        this.betText.on('pointerdown', () => {
            this.setBank(this.bank + this.bet);
            this.setBet(0);
        })
        this.betText.setTransform(-400, -50);
        this.addChild(this.betText);


        // resetBoard
        this.resetBoard = new Sprite(loader.resources.dealButton.texture as Texture<Resource>);
        this.resetBoard.interactive = !this.roundInPlay;
        this.resetBoard.buttonMode = true;

        this.resetBoard.on('pointerdown', () => {
            this.setBet(0);
            this.setBank(0);
            this.cardsInDeck.length = 0;
            this.clearHands();
            this.cardsInDiscardPile.length = 0;
            this.stackDeck();
            this.shuffleDeck();
            this.setBank(1000);
            this.addChild(this.startGameButton);
            this.confirmBetButton.interactive = true;
            this.raiseBetButton.interactive = true;
            this.roundInPlay = false;
        })

        this.addChild(this.resetBoard);
        this.resetBoard.setTransform(-400, 360, 4, 4);

        // NextRound button
        this.nextRoundButton = new Sprite(loader.resources.dealButton.texture as Texture<Resource>);
        this.nextRoundButton.interactive = !this.roundInPlay;
        this.nextRoundButton.buttonMode = true;
        this.nextRoundButton.setTransform(0, -100, 2, 2);
        this.nextRoundButton.on ('pointerdown', () => {
            this.clearHands();
            this.raiseBetButton.interactive = true;
            this.removeChild(this.nextRoundButton);

        })

        // StartGame
        this.startGameButton = new Sprite(loader.resources.dealButton.texture as Texture<Resource>);
        this.startGameButton.interactive = !this.roundInPlay;
        this.startGameButton.buttonMode = true;

        this.startGameButton.on('pointerdown', () => {
            this.stackDeck();
            this.shuffleDeck();
            this.setBank(1000);
            this.removeChild(this.startGameButton);
        })

        this.addChild(this.startGameButton);
        this.startGameButton.setTransform(-400, 80, 4, 4);

        // Raise bet
        this.raiseBetButton = new Sprite (loader.resources.dealButton.texture as Texture<Resource>);
        this.raiseBetButton.interactive = !this.roundInPlay;
        this.raiseBetButton.buttonMode = true;
        this.raiseBetButton.tint = 0x00FF00;

        this.raiseBetButton.on('pointerdown', () => {
            const change = 10;
            if (change > this.bank) throw new Error ('not enough mone in bank');

            this.setBank(this.bank - change);
            this.setBet(this.bet + change);
            // ???
            this.confirmBetButton.interactive = true;
        })

        this.addChild(this.raiseBetButton);
        this.raiseBetButton.setTransform(-400, 180, 4, 4);

        // Confirm Bet
        this.confirmBetButton = new Sprite (loader.resources.dealButton.texture as Texture<Resource>);
        this.confirmBetButton.interactive = (this.bet > 0 && !this.roundInPlay);
        this.confirmBetButton.buttonMode = true;
        this.confirmBetButton.tint = 0xFFC0CB;

        this.confirmBetButton.on ('pointerdown', () => {
            this.dealCard('dealer');
            this.dealCard('player');
            this.dealCard('dealer');
            this.dealCard('player')
            this.roundInPlay = true;
            // ???
            this.confirmBetButton.interactive = false;
            this.raiseBetButton.interactive = false;

            if (this.countHandScore('player') === 21) {
                this.resolveRound('blackJack');
                this.clearHands();
            }
            else {
                this.addChild(this.hitButton);
                this.addChild(this.standButton);
            }
            console.log(`cards dealt, player has ${this.countHandScore("player")} points, dealer has ${this.countHandScore("dealer")}`)
        })

        this.confirmBetButton.setTransform(-400, 0, 4, 4);
        this.addChild(this.confirmBetButton);

        // Hit button
        this.hitButton = new Sprite (loader.resources.hit.texture as Texture<Resource>);
        this.hitButton.anchor.set(0.5);
        this.hitButton.setTransform(600, 100, 0.1, 0.1);
        this.hitButton.interactive = true;
        this.hitButton.buttonMode = true;
        this.hitButton.on('pointerdown', () => {
            this.dealCard('player');

            const playerScore = this.countHandScore("player");
            const dealerScore = this.countHandScore("dealer")

            console.log(`player hits, he now has ${playerScore} points`)
            if (playerScore === 21) {
                this.removeChild(this.hitButton);
                if (dealerScore === playerScore) {
                    this.resolveRound('draw');
                    this.removeChild(this.hitButton);
                    this.removeChild(this.standButton);
                    return;
                }
                this.removeChild(this.hitButton);
                this.removeChild(this.standButton);
                this.dealerTurn();

            }
            if (playerScore > 21) {
                this.removeChild(this.hitButton);
                this.removeChild(this.standButton);
                this.resolveRound('lose');
            }
                
        })

        // Stand button
        this.standButton = new Sprite (loader.resources.stand.texture as Texture<Resource>);
        this.standButton.anchor.set(0.5);
        this.standButton.setTransform(800, 100, 0.25, 0.25);
        this.standButton.interactive = true;
        this.standButton.on('pointerdown', () => {
            this.removeChild(this.hitButton);
            this.dealerTurn();
            this.removeChild(this.standButton);
        })
    }

    stackDeck(): void {
        Object.values(CardRank).forEach((rank) => {
            Object.values(CardSuit).forEach((suit) => {
            // @ts-ignore
                
              this.cardsInDeck.push(new Card(this.loader.resources[suit+rank].texture as Texture<Resource>, suit, rank, this.loader))
            })
          })
    }
    
    shuffleDeck(): void {
        if (!this.cardsInDeck.length) throw new Error('deck is empty');
        
        for (let i = 0; i < 10; i += 1) {
            this.cardsInDeck.sort(() => Math.random() - 0.5)
        }
    }

    dealCard(target: Target): void {
        if (!this.cardsInDeck.length) {
            throw new Error('deck is empty')
            return;
        };

        const currentCard = this.cardsInDeck.pop()!;

        if (target === "player") {
            currentCard.flip();
            this.addCard(currentCard, "player"); 
        }
        
        if (target === "dealer") {
            if (this.cardsInDealerHand.length !== 1) {
                currentCard.flip();
            }   
            this.addCard(currentCard, "dealer")
        }
        console.log(`dealt ${currentCard.cardName} to ${target}`);
        this.countHandScore(target);
    }

    addCard(currentCard: Card, target: Target ): void {
        
        currentCard.flip();

        if (target === "player") {
            this.playerHand.addChild(currentCard);
            currentCard.setTransform((this.cardsInPlayerHand.length * currentCard.width/2),(-this.cardsInPlayerHand.length * currentCard.height/4));
            this.cardsInPlayerHand.push(currentCard);
        }
        if (target === "dealer") {
            this.dealerHand.addChild(currentCard);
            currentCard.setTransform((this.cardsInDealerHand.length * currentCard.width/2),(-this.cardsInDealerHand.length * currentCard.height/4));
            this.cardsInDealerHand.push(currentCard);
        }   
    }

    clearHands(): void {
        const playerHandSize = this.cardsInPlayerHand.length;
        const playerDiscard = this.cardsInPlayerHand.splice(0, playerHandSize);
        this.cardsInDiscardPile = [...this.cardsInDiscardPile, ...playerDiscard];
        this.playerHand.removeChildren()

        const dealerHandSize = this.cardsInDealerHand.length;
        const dealerDiscard = this.cardsInDealerHand.splice(0, dealerHandSize);
        this.cardsInDiscardPile = [...this.cardsInDiscardPile, ...dealerDiscard];
        this.dealerHand.removeChildren()
        this.removeChild(this.hitButton);
        this.removeChild(this.standButton);
    }

    countHandScore(target: Target): number {
        let sum = 0;
        let acesCount = 0;
        
        (target === 'player' ? this.cardsInPlayerHand : this.cardsInDealerHand).forEach((card) => {sum += card.cardScore});
        (target === 'player' ? this.cardsInPlayerHand : this.cardsInDealerHand).forEach((card) => {if (card.cardRank === 'A') acesCount += 1});

        while (sum > 21 && acesCount > 0) {
            sum -= 10;
            acesCount -= 1;
        }
        return sum;
    }

    setBank(value: number): void {
        this.bank = value;
        this.bankText.text = `Bank: ${value}`;
    }

    setBet(value: number): void {
        // if (this.bank >= amount) {
        //     switch (raise) {
        //         case 'up': 
        //             this.bank -= amount;
        //             this.bet += amount;
        //             break;
        //         case 'down':
        //             this.bank += amount;
        //             this.bet -= amount;
        //             break;
        //         default:
        //             throw new Error('changeBet must contain up or down as second attribute');           
        //     }
        //     this.betText.text = `Bet: ${this.bet}`;
        //     this.bankText.text = `Bank: ${this.bank}`;   
        // }
        // else throw new Error ('not enough mone in bank );')
        this.bet = value;
        this.betText.text = `Bet: ${this.bet}`;
    }

    resolveRound(result: 'win'|'draw'|'lose'| 'blackJack'): void {
        this.cardsInDealerHand[1].flip();
        this.roundInPlay = false;

        const cases = {
            'win': () => {
                this.setBank(this.bank + this.bet*2);
                this.setBet(0);
                console.log('player won')
            },

            'draw': () => {
                this.setBank(this.bank + this.bet);
                this.setBet(0);
                console.log('round draw')
            },

            'lose': () => {
                this.setBet(0);
                console.log('player lost the round')
            },

            'blackJack': () => {
                this.setBank(this.bank + this.bet*1.5);
                this.setBet(0);
                console.log('player won (blackjack)')
            }
        }

        this.getNextRoundBtn(result);
        return cases[result]();
    }

    dealerTurn(): void {
        while (this.countHandScore("dealer") < 17) {
            console.log('dealers hand is less than 17, drawing card')
            this.dealCard('dealer');
        }
        
        const dealerScore = this.countHandScore("dealer");
        const playerScore = this.countHandScore('player');

        console.log(`cards drawn. player has ${playerScore}, dealer has ${dealerScore}, counting round result...`)
        if (playerScore === dealerScore) {
            this.resolveRound("draw");
            return;
        }
        if ((playerScore > dealerScore) || (dealerScore > 21)) {
            this.resolveRound('win');
            return;
        }
        this.resolveRound('lose');
    }

    getNextRoundBtn(result: 'win'|'lose'|'draw'|'blackJack') {
        const cases = {
            'win': () => {
                this.nextRoundButton.texture = this.loader.resources.pog.texture as Texture<Resource>;
            },
            'lose': () => {
                this.nextRoundButton.texture = this.loader.resources.nowin.texture as Texture<Resource>;
            },
            'draw': () => {
                this.nextRoundButton.texture = this.loader.resources.draw.texture as Texture<Resource>;
            },
            'blackJack': () => {
                this.nextRoundButton.texture = this.loader.resources.pog.texture as Texture<Resource>;
            },
        }

        this.addChild(this.nextRoundButton);
        return cases[result]();
    }

}
