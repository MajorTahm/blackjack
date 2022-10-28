import { Assets } from "@pixi/assets";
import { Container, Sprite } from "pixi.js";
import { CardRank, CardSuit } from "../../types";
import Card from "../Card";
import ScoreBadge from "../ScoreBadge";

export default class Dealer extends Container {

    scoreBadge: ScoreBadge;

    hand: Container;

    constructor() {
        super()

        this.hand = new Container();
        this.hand.scale.set(0.8, 1)
        this.addChild(this.hand);

        this.scoreBadge = new ScoreBadge();
        this.addChild(this.scoreBadge);

    }
}