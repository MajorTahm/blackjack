import { Container } from "pixi.js";
import { PlayerSeatSub, SeatSub } from "../../lib/states/sub/SeatSub";
import ScoreBadge from "../ScoreBadge";

export default class Seat extends Container {
    
    hand: Container;

    chips: Container;

    playerBadge: Container;

    scoreBadge: Container;

    seatState: PlayerSeatSub | SeatSub;

    constructor(seatState: PlayerSeatSub | SeatSub) {
        super()

        this.seatState = seatState;
        this.hand = new Container();
        this.hand.scale.set(0.8, 1)
        this.addChild(this.hand);
        
        this.chips = new Container;

        this.playerBadge = new Container();

        this.scoreBadge = new ScoreBadge(seatState);
        this.scoreBadge.position = {
            x: -this.scoreBadge.width*2,
            y: this.height/2
        }
        this.addChild(this.scoreBadge);
    }
}