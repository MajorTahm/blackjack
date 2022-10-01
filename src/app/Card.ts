import { Sprite, Texture, Resource, Loader } from "pixi.js";
import { CardName, CardRank, CardSuit } from "../types";

export interface ICard {
    faceUp: boolean,
    cardSuit: CardSuit,
    cardRank: CardRank,
    cardName: CardName,
    cardScore: number,
}

export default class Card extends Sprite implements ICard {
    faceUp: boolean;

    cardSuit: CardSuit;

    cardRank: CardRank;

    private loader: Loader;

    constructor(texture: Texture<Resource>, cardSuit: CardSuit, cardRank: CardRank, loader: Loader){
        super(texture)

        this.faceUp = true
        this.cardSuit = cardSuit
        this.cardRank = cardRank
        this.loader = loader

        this.anchor.set(0.5)
    }

    get cardName(): CardName {
        return `${this.cardSuit}${this.cardRank}` as CardName;
    }

    get cardScore(): number {

        const pointValues = {
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            '7': 7,
            '8': 8,
            '9': 9,
            '10': 10,
            'J': 10,
            'Q': 10,
            'K': 10,
            'A': 11,
        };

        const score = pointValues[this.cardRank];
        return score;
    }

    flip(): void {
         if (this.faceUp) {
            this.faceUp = false;
            this.texture = this.loader.resources.back.texture as Texture<Resource>;
            console.log(`flipped ${this.cardName} now it should be facedown`)
            return;
         }
            this.faceUp = true;
            this.texture = this.loader.resources[this.cardSuit+this.cardRank].texture as Texture<Resource>;
            console.log(`flipped ${this.cardName} now it should be faceup`)

            // 01.10.2022 kogda nibud ya ee perepishu :)
    }
}