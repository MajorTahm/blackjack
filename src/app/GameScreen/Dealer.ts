/* eslint-disable import/no-cycle */
import { Container } from "pixi.js";
import { app } from "../../app";
import ScoreBadge from "../ScoreBadge";

export default class Dealer extends Container {

    scoreBadge: ScoreBadge;

    hand: Container;

    constructor() {
        super()

        this.hand = new Container();
        this.hand.scale.set(0.8, 1)
        this.addChild(this.hand);

        this.scoreBadge = new ScoreBadge(app.tableState!.dealerSeat);
        this.addChild(this.scoreBadge);

    }
}