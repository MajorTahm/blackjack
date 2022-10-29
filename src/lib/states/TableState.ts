/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Assets } from "@pixi/assets";
import { makeAutoObservable } from "mobx";
import Card from "../../app/Card";
import { CardRank, CardSuit } from "../../types";
import {SeatSub, PlayerSeatSub } from "./sub/SeatSub";

const stackDeck = (deckArr: Card[] = []): Card[] => {
    const deck = deckArr.slice();

    Object.values(CardRank).forEach((rank) => {
        Object.values(CardSuit).forEach((suit) => {
        // @ts-ignore
            
          deck.push(new Card(Assets.cache.get(`card${[suit+rank]}`), suit, rank))
        })
    })
    return deck;
}

const shuffleDeck = (deckArr: Card[]): Card[] => {
    if (!deckArr.length) throw new Error('can`t shuffle an empty deck');
    
    const deck = deckArr.slice();

    for (let i = 0; i < 10; i += 1) {
        deck.sort(() => Math.random() - 0.5)
    }
    return deck;
}

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
        
        this.deckCards = shuffleDeck(stackDeck());
        
        this.playerSeat = new PlayerSeatSub();

        this.dealerSeat = new SeatSub();

        makeAutoObservable(this);
    }

    
    // TODO: cringe

    dealPlayer(): void{
        if (!this.deckCards.length) {
            throw new Error('deck is empty');
            return;
        }

        const currentCard = this.deckCards.pop()!;

        this.playerSeat.cards.push(currentCard);
    }

    clearPlayer(): void {
        this.playerSeat.cards.length = 0;
    }

    deal(seat: SeatSub | PlayerSeatSub): void {
        if (!this.deckCards.length) {
            throw new Error('deck is empty');
            return;
        }

        const currentCard = this.deckCards.pop()!;

        seat.cards.push(currentCard);

        // if 4 or less cards left => stack new deck, shuffle it and add to the state deck
        if (this.deckCards.length <= 4) {
            const deck = shuffleDeck(stackDeck());

            this.deckCards = [...this.deckCards, ...deck];
        }
    }
}