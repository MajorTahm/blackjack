import { Container } from "pixi.js";

export default class Seat extends Container {
    
    hand: Container;

    chips: Container;

    playerBadge: Container;

    score: Container;

    constructor() {
        super()

        this.hand = new Container;

        this.chips = new Container;

        this.playerBadge = new Container;

        this.score = new Container;
    }
}