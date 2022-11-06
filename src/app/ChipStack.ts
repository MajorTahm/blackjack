/* eslint-disable import/no-cycle */
import { Container } from "pixi.js";
import { ChipVal } from "../types";
import Chip from "./Chip";

const rotations = [0, 0.8, 0.6, 0.3, 0.4];

export default class ChipStack extends Container {

    chips: Chip[];
    
    val?: ChipVal;

    constructor(val?: ChipVal) {
        super();
        this.val = val;
        this.chips = [];

    }

    addChip(chip: Chip): void {;
        this.chips.push(chip);
    }

    // stack renders up to 5 chips
    renderStack(): void {
        if (this.chips.length === 0) return;

        this.chips.forEach((chip, i) => {
            if (i < 6) {
                // eslint-disable-next-line no-param-reassign
                chip.y = 0 - 15 * i;
                chip.anchor.set(0.5);
                // eslint-disable-next-line no-param-reassign
                chip.rotation = rotations[i];
                this.addChild(chip);
            }
        });
        this.swapUpper();
    }
    
    // Swaps the top rendered chip with the last of chips[]
    swapUpper(): void {
        
        const lastChip = this.chips[this.chips.length - 1];
        lastChip.anchor.set(0.5);
        lastChip.rotation = 0;
        lastChip.position.set(this.children[this.children.length - 1].position.x, this.children[this.children.length - 1].position.y);
        this.removeChild(this.children[this.children.length - 1]);
        this.addChild(lastChip);
    }
}

