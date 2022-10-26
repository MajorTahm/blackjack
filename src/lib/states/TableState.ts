/* eslint-disable @typescript-eslint/ban-ts-comment */
import { makeAutoObservable } from "mobx";
import Card from "../../app/Card";
import { CardRank, CardSuit } from "../../types";
import {SeatSub, PlayerSeatSub } from "./sub/SeatSub";

export class TableState {
    
    deckCards: Card[];

    dealerSeat: {
        cards: Card[],

        score: number,
    };

    playerSeat: {
        handIsSplit: boolean;

        cards: Card[],

        cardsOff: Card[],

        score: number,

        scoreOff: number,
    };

    constructor() {
        
        this.deckCards = [];
        
        this.playerSeat = new PlayerSeatSub();

        this.dealerSeat = new SeatSub();

        makeAutoObservable(this);
    }

    stackDeck(): void {
        Object.values(CardRank).forEach((rank) => {
            Object.values(CardSuit).forEach((suit) => {
            // @ts-ignore
                
              this.deckCards.push(new Card(this.loader.resources[suit+rank].texture as Texture<Resource>, suit, rank, this.loader))
            })
          })
    }
    
    shuffleDeck(): void {
        if (!this.deckCards.length) throw new Error('deck is empty');
        
        for (let i = 0; i < 10; i += 1) {
            this.deckCards.sort(() => Math.random() - 0.5)
        }
    }
    // TODO: cringe

    dealPlayer(): Card | undefined {
        if (!this.deckCards.length) {
            throw new Error('deck is empty');
            return undefined;
        }

        const currentCard = this.deckCards.pop()!;

        this.playerSeat.cards.push(currentCard);
        return currentCard;
    }
}

export const tableState = new TableState();