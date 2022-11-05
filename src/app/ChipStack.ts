/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container } from "pixi.js";
import { ChipVal } from "../types";
import Chip from "./Chip";

export default class ChipStack extends Container {

    chips: Chip[];
    
    val: ChipVal;

    index: number;

    amount: number;

    constructor(val: ChipVal, amount: number, index: number) {
        super();
        this.amount = amount;
        this.val = val;
        this.index = index;
        this.chips = [];

        this.fillStack();
        this.renderStack();
    }

    fillStack(): void {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.amount; i++) {
          const chip = new Chip  (Assets.cache.get(`${this.val}`), this.val);
        this.chips.push(chip);  
        }
    }

    // stack renders up to 5 chips but real amount of chips inside chipsArr is indefinite
    renderStack(): void {
        if (this.chips.length === 0) return;

        this.chips.forEach((chip, i) => {
            if (i < 6) {
                // eslint-disable-next-line no-param-reassign
                chip.y = 0 - 15 * i;
                chip.anchor.set(0.5);
                // eslint-disable-next-line no-param-reassign
                chip.rotation = Math.random();
                this.addChild(chip);
            }
        });
        this.children.at(-1)!.rotation = 0;      
    }
}