import { makeAutoObservable } from "mobx"
import Card from "../../app/Card"

export class PlayerState {
    PlayerName: string

    PlayerLevel: number
    
    handIsSplit: boolean
    
    mainCards: Card[]

    offCards: Card[]

    mainBet: number

    offBet: number

    bank: number

    constructor() {
        this.PlayerName = 'John Doe';

        this.PlayerLevel = 1;

        this.handIsSplit = false;

        this.mainCards = [];

        this.offCards = [];

        this.mainBet = 0;

        this.offBet = 0;

        this.bank = 1000;

        makeAutoObservable(this);
    }

    setBank(value: number): void {
        this.bank = value;
    }

    setMainBet(value: number): void {
        this.mainBet = value;
    }
    
    splitHand(): void {
        this.handIsSplit = true;
    }

    addMainCard(card: Card): void {
        this.mainCards.push(card);
    }
}

export const player1 = new PlayerState();