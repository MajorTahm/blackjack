/* eslint-disable import/no-cycle */
import { Sprite, Texture } from "pixi.js";
import { app } from "../app";
import { ChipVal } from "../types";

export default class Chip extends Sprite {

    value: ChipVal;

    constructor(texture: Texture, value: ChipVal) {
        super(texture);
        
        this.value = value;
        this.texture = texture;

        // this.interactive = true;
        // this.on('pointerdown', () => {
        //     app.playerState!.setBank(app.playerState!.bank - value);
        //     app.tableState!.playerSeat.setBet(app.tableState!.playerSeat.bet + value);

        // })
    }
}