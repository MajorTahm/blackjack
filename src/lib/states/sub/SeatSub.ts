/* eslint-disable max-classes-per-file */
import { makeAutoObservable } from "mobx";
import Card from "../../../app/Card";

function countScore(cards: Card[]) {
    let sum = 0;
    let acesCount = 0;

    if (cards.length === 0)
        return 0;

    cards.forEach((card) => {
        if (card.cardRank === 'A') {
            sum += card.cardScore;
            acesCount += 1;
        } else {
            sum += card.cardScore;
        }
    });

    while (sum > 21 && acesCount > 0) {
        sum -= 10;
        acesCount -= 1;
    }

    return sum;
}

export class SeatSub {

    cards: Card[];

    constructor() {

        this.cards = [];
        makeAutoObservable(this);
    }
    
    get score(): number {
        return countScore(this.cards)
    }
}

export class PlayerSeatSub {
    cards: Card[];

    cardsOff: Card[];

    handIsSplit: boolean;

    constructor() {

        this.handIsSplit = false;

        this.cards = [];

        this.cardsOff = [];
        makeAutoObservable(this);
    }

    get score(): number {
        return countScore(this.cards)
    }

    get scoreOff(): number {
        return countScore(this.cardsOff);
    }
}
