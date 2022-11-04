/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { autorun } from "mobx";
import { Container, Sprite } from "pixi.js";
import { app } from "../../app";
import { ChipVal } from "../../types";

const chipValues: ChipVal[] = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000]

export default class BetModal extends Container {

    background: Sprite;
    
    stack1?: Container;

    stack5?: Container;

    stack10?: Container;

    stack25?: Container;

    stack50?: Container;

    stack100?: Container;

    stack500?: Container;

    stack1000?: Container;

    stack5000?: Container;

    stack10000?: Container;

    constructor() {
        super();

        this.background = new Sprite(Assets.cache.get('desk_small'));
        this.addChild(this.background);
        
        autorun(() => {
            this.renderChips();
        })
    }

    getStack(val: ChipVal, amount: number, index: number): void {
        this[`stack${val}`] = new Container();
        // eslint-disable-next-line no-nested-ternary
        this[`stack${val}`]!.x = (index < 3) ? 250 + index * 250 : (index < 6 ) ? 250 + ((index-3) * 250) : 250 + ((index-6) * 250);
        // eslint-disable-next-line no-nested-ternary
        this[`stack${val}`]!.y = (index < 3) ? 200 : (index < 6 ) ? 400 : 600
        this[`stack${val}`]!.scale.set(0.8)
        this.addChild(this[`stack${val}`]!);
        
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < amount; i++) {
            const chip = new Sprite(Assets.cache.get(`${val}`));
            chip.y = 0 - 15*i;
            chip.anchor.set(0.5);
            chip.rotation = (i === amount - 1) ? 0 : Math.random();
            this[`stack${val}`]?.addChild(chip);
        }
    }
    
    renderChips(): void {
        const {bank} = app.playerState!;

        chipValues.forEach((value, index) => {
            const divider = Math.floor(bank/value);

            if (divider < 0) return;
            if (divider >= 5) {
                this.getStack(value, 5, index);
                return;
            }
            this.getStack(value, divider, index);
        });
    }
}

