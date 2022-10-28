import { Assets } from "@pixi/assets";
import { autorun } from "mobx";
import { Container, Sprite } from "pixi.js";
import { CardRank, CardSuit } from "../../types";
import ScoreBadge from "../ScoreBadge";

export default class Seat extends Container {
    
    hand: Container;

    chips: Container;

    playerBadge: Container;

    score: Container;

    constructor() {
        super()

        this.hand = new Container();
        this.hand.scale.set(0.8, 1)
        this.addChild(this.hand);
        
        this.chips = new Container;

        this.playerBadge = new Container;

        this.score = new ScoreBadge();
        this.addChild(this.score);
    }
}