import { Sprite, Texture, Resource } from "pixi.js";

// export type Card = {
//     sprite: Sprite,
//     faceUp: boolean
// }

// export const createCard = (
//     texture: Texture<Resource>,
//     x: number,
//     y: number
// ): Card => {
//     const sprite = new Sprite(texture);
// }

export default class Card extends Sprite {
    private faceUp: boolean;

    constructor(texture: Texture<Resource>, faceUp=true){
        super(texture)

        this.faceUp = faceUp
        this.anchor.set(0.5)
    }
}