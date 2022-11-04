import { Sprite, Texture } from "pixi.js";
import { ChipVal } from "../types";

export default class Chip extends Sprite {

    value: ChipVal;

    constructor(texture: Texture, value: ChipVal) {
        super(texture);
        
        this.value = value;
        this.texture = texture;
    }
}