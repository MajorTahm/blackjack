/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Assets } from "@pixi/assets";
import { makeAutoObservable } from "mobx";
import Card from "../../app/Card";
import { CardRank, CardSuit } from "../../types";
import {SeatSub, PlayerSeatSub } from "./sub/SeatSub";

export default class TableState {
    
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

        this.stackDeck();
    }

    stackDeck(): void {
        Object.values(CardRank).forEach((rank) => {
            Object.values(CardSuit).forEach((suit) => {
            // @ts-ignore
                
              this.deckCards.push(new Card(Assets.cache.get(`card${[suit+rank]}`), suit, rank))
            })
          })
          console.log(this.deckCards)
    }
    
    shuffleDeck(): void {
        if (!this.deckCards.length) throw new Error('deck is empty');
        
        for (let i = 0; i < 10; i += 1) {
            this.deckCards.sort(() => Math.random() - 0.5)
        }
    }
    // TODO: cringe

    dealPlayer(): void{
        if (!this.deckCards.length) {
            throw new Error('deck is empty');
            return;
        }

        const currentCard = this.deckCards.pop()!;

        this.playerSeat.cards.push(currentCard);
        console.log(this.playerSeat.cards);
    }
}
