/* eslint-disable import/no-cycle */
import { autorun } from "mobx";
import { Container } from "pixi.js";
import { PlayerState } from "../../../lib/states/PlayerState";
import { PlayerSeatSub, SeatSub } from "../../../lib/states/sub/SeatSub";
import Label from "./Label";
import ScoreBadge from "./ScoreBadge";

export default class Seat extends Container {
    
    hand: Container;

    handOff?: Container;

    chips: Container;

    playerBadge: Container;

    scoreBadge: Container;

    seatState: PlayerSeatSub | SeatSub;

    label?: Label;

    constructor(seatState: PlayerSeatSub | SeatSub, playerState?: PlayerState) {
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

        if (seatState.constructor.name === `PlayerSeatSub` && playerState) {
            this.label = new Label(playerState!);
            this.label.setTransform(
                0,
                -this.label.height,
            )
            this.label.scale.set(0.8)
            this.label.position.set( -this.label.width/2, this.height + this.label.height/1.5 )
            this.addChild(this.label);
        }

        console.log(this.children)

        autorun(() => {
            this.renderHand();
        })
    }

    renderHand(): void {
        const {cards} = this.seatState;
            
        if (cards.length === 0) {
            this.hand.removeChildren();
            return;
        } 
        this.hand.removeChildren();
        cards.forEach((card) => {
            card.setTransform(
                card.width/4*cards.indexOf(card),
                0 - card.height/8*cards.indexOf(card),
            )
        this.hand.addChild(card)
        });
        if (this.handOff) this.handOff.destroy();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (this.seatState.constructor.name === "PlayerSeatSub" && this.seatState.handIsSplit === true) {
            const {cardsOff} = this.seatState as PlayerSeatSub;

            this.handOff = new Container();
            this.handOff.removeChildren();

            cardsOff.forEach((card) => {
                card.setTransform(
                    card.width/4*cardsOff.indexOf(card),
                    0 - card.height/8*cardsOff.indexOf(card),
                )
                this.handOff?.addChild(card)
            })
            this.handOff.setTransform(
                this.hand.width + 20,
                this.hand.y,
                0.8,
                1
            )
            this.addChild(this.handOff);
            console.log(this.children);
        }

        
    }
}