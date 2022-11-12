/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Assets } from "@pixi/assets";
import { Sprite, Texture, Resource } from "pixi.js";
import { CardName, CardRank, CardSuit } from "../types";


export interface ICard {
    cardSuit: CardSuit,
    cardRank: CardRank,
    cardName: CardName,
    cardScore: number,
}

export default class Card extends Sprite implements ICard {

    cardSuit: CardSuit;

    cardRank: CardRank;

    faceCache: Texture;

    constructor(texture: Texture<Resource>, cardSuit: CardSuit, cardRank: CardRank){
        super(texture)

        this.cardSuit = cardSuit
        this.cardRank = cardRank
        this.faceCache = texture;

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
        if (this.texture === this.faceCache) {
            this.texture = Assets.cache.get('cardBack_red1');
            return;
        }
        this.texture = this.faceCache;
    }
}