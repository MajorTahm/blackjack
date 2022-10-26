import { Assets } from "@pixi/assets";
import { Container, Sprite } from "pixi.js";
import { CardRank, CardSuit } from "../../types";
import Card from "../Card";
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
        
        const card1 = new Card(Assets.cache.get('cardSpadesA'), 'Spades' as CardSuit, 'A' as CardRank) as Sprite;
        const card2 = new Card(Assets.cache.get('cardSpadesA'), 'Spades' as CardSuit, 'A' as CardRank) as Sprite;

        card1.anchor.set(0,0)
        card2.anchor.set(0,0)
        card2.setTransform(card2.width/2, this.height - card2.height/10);
        this.hand.addChild(card1, card2);


        this.chips = new Container;

        this.playerBadge = new Container;

        this.score = new ScoreBadge();
        this.addChild(this.score)
    }
}