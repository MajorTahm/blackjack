/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container, ObservablePoint, Sprite } from "pixi.js";
import { app } from "../../app";
import { ChipVal, StackName } from "../../types";
import ChipStack from "../ChipStack";

const chipValues: ChipVal[] = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000]

export default class BetModal extends Container {

    background: Sprite;
    
    stack1?: ChipStack;

    stack5?: ChipStack;

    stack10?: ChipStack;

    stack25?: Container;

    stack50?: ChipStack;

    stack100?: ChipStack;

    stack500?: ChipStack;

    stack1000?: ChipStack;

    stack5000?: ChipStack;

    stack10000?: ChipStack;

    betPile?: Container;

    constructor() {
        super();

        this.background = new Sprite(Assets.cache.get('desk_small'));
        this.addChild(this.background);
        this.betPile = new Container;
        this.addChild(this.betPile);
        
        this.renderChips();
    }

    getStack(val: ChipVal, amount: number, index: number): void {
        const stackName: StackName = `stack${val}`;
        
        this[stackName] = new ChipStack(val, amount, index);
        this.calcStackPos(stackName, index);
        this[stackName]!.scale.set(0.8)
        this.addChild(this[stackName]!);
        this[stackName]!.interactive = true;
            this[stackName]!.on('pointerdown', () => {
                app.playerState!.setBank(app.playerState!.bank - val);
                app.tableState!.playerSeat.setBet(app.tableState!.playerSeat.bet + val); 
            })
    }
    
    renderChips(): void {
        const {bank} = app.playerState!;

        chipValues.forEach((value, index) => {
            const divider = Math.floor(bank/value);

            if (divider < 0) return;
            this.getStack(value, divider, index);
        });
    }
    
    calcStackPos(stackName: StackName, index: number): ObservablePoint {
        const X = 250;
        const Y = 300;
        const YInterval = 200;

        let x = 0;
        let y = 0;

        if (index < 3) {
            x = (index + 1) * X;
            y = Y;
            return this[stackName]!.position.set(x, y);
        }
        if (index < 6) {
            x = (index - 2) * X;
            y = Y + YInterval;
            return this[stackName]!.position.set(x, y);
        }
        x = (index - 5) * X;
        y = Y + 2*YInterval;
        return this[stackName]!.position.set(x, y);
    }
}
