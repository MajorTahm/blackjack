import { makeAutoObservable } from "mobx"
import Card from "../../app/Card"

export class PlayerState {
    
    handIsSplit: boolean
    
    mainCards: Card[]

    offCards: Card[]

    mainBet: number

    offBet: number

    bank: number

    constructor() {
        this.handIsSplit = false;

        this.mainCards = [];

        this.offCards = [];

        this.mainBet = 0;

        this.offBet = 0;

        this.bank = 0;

        makeAutoObservable(this);
    }

    setBank(value: number) {
        this.bank = value;
    }

    setMainBet(value: number) {
        this.mainBet = value;
    }
    
    splitHand() {
        this.handIsSplit = true;
    }

    addMainCard(card: Card) {
        this.mainCards.push(card);
    }
}

export let player1 = new PlayerState;