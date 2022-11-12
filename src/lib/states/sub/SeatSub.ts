/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import { makeAutoObservable } from "mobx";
import { app } from "../../../app";
import Card from "../../../app/Card";
import { PlayerCurrentPhase } from "../../../types";

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

    phase: PlayerCurrentPhase;

    cards: Card[];

    cardsOff: Card[];

    handIsSplit: boolean;

    bet: number;

    betOff: number;

    constructor() {
        this.phase = "inactive";

        this.handIsSplit = false;

        this.cards = [];

        this.cardsOff = [];

        this.bet = 0;

        this.betOff = 0;
        
        makeAutoObservable(this);
    }

    get score(): number {
        return countScore(this.cards)
    }

    get scoreOff(): number {
        return countScore(this.cardsOff);
    }

    setBet(value: number) {
        this.bet = value;
    }

    // !!!integrage with PlayerState to check for enough bank money to split!
    split(): void {
        if (this.cards.length === 2 && !this.handIsSplit && this.cardsOff.length === 0 && app.playerState!.bank >= this.bet) {
            this.handIsSplit = true;
            this.cardsOff.push(this.cards.pop()!);
            app.playerState!.bank -= this.bet;
            this.betOff = this.bet;
            console.log('Split!');
        }
    }

    setPhase (phase: PlayerCurrentPhase): void {
        this.phase = phase;
    }
}
