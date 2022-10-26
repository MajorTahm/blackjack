/* eslint-disable max-classes-per-file */
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
    }
    
    get score(): number {
        return countScore(this.cards)
    }
}

export class PlayerSeatSub extends SeatSub {
    cardsOff: Card[];

    handIsSplit: boolean;

    constructor() {
        super();

        this.handIsSplit = false;

        this.cards = [];

        this.cardsOff = [];
    }

    get score(): number {
        return countScore(this.cards)
    }

    get scoreOff(): number {
        return countScore(this.cardsOff);
    }
}
