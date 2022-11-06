/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { autorun } from "mobx";
import { Container, ObservablePoint, Sprite } from "pixi.js";
import { app } from "../../app";
import { ChipVal, StackName } from "../../types";
import Chip from "../Chip";
import ChipStack from "../ChipStack";

const chipValues: ChipVal[] = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000]

export default class BetModal extends Container {

    background: Sprite;
    
    stack1?: ChipStack;

    stack5?: ChipStack;

    stack10?: ChipStack;

    stack25?: ChipStack;

    stack50?: ChipStack;

    stack100?: ChipStack;

    stack500?: ChipStack;

    stack1000?: ChipStack;

    stack5000?: ChipStack;

    stack10000?: ChipStack;

    stacksContainer: Container;

    betPile?: ChipStack;

    confirmBetButton: Sprite;

    constructor() {
        super();

        this.background = new Sprite(Assets.cache.get('desk_small'));
        this.addChild(this.background);

        this.stacksContainer = new Container;
        this.stacksContainer.width = this.background.width;
        this.stacksContainer.height = this.background.height;
        this.addChild(this.stacksContainer);

        this.betPile = new ChipStack;
        this.betPile.x = this.background.width - 400;
        this.betPile.y = this.background.height/2;
        this.betPile.interactive = true;
        this.betPile.buttonMode = true;
        this.betPile.on('pointerdown', () => {
            this.betPile?.removeChild(this.betPile.children[this.betPile.children.length - 1]);
            const topChip: Chip = this.betPile!.chips.pop()!;
            app.tableState!.playerSeat.setBet(app.tableState!.playerSeat.bet - topChip.value);
            app.playerState!.setBank(app.playerState!.bank + topChip.value);
        })
        this.addChild(this.betPile);

        this.confirmBetButton = new Sprite (Assets.cache.get('button_ok'));
        this.confirmBetButton.anchor.set(0.5);
        this.confirmBetButton.scale.set(0.8);
        this.confirmBetButton.x = this.betPile.x;
        this.confirmBetButton.y = this.background.height - this.confirmBetButton.height*1.5;
        this.confirmBetButton.buttonMode = true;
        this.confirmBetButton.on('pointerdown', () => {
            app.bus.emit('betConfirmed');
            app.gameScreen?.toggleBetModal();
        })
        this.addChild(this.confirmBetButton);
        
        autorun(() => {
            this.stacksContainer.removeChildren();
            this.renderChips();
            this.betPile?.renderStack();
            this.confirmBetButton.interactive = !!app.tableState!.playerSeat.bet;
        })
    }

    // create a new chip stack, calculate it's coordinates and add stack to modal window
    getStack(val: ChipVal, amount: number, index: number): void {
        const stackName: StackName = `stack${val}`;
        
        this[stackName] = new ChipStack(val);
        
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < amount; i++) {
            const newChip = new Chip(Assets.cache.get(`${val}`), val)
            this[stackName]!.addChip(newChip);
        }
        this[stackName]!.scale.set(0.8)
        this[stackName]!.position.set(this.calcStackPos(stackName, index).x, this.calcStackPos(stackName, index).y);
        this[stackName]!.renderStack();
        this.stacksContainer.addChild(this[stackName]!);

        this[stackName]!.interactive = true;
            this[stackName]!.on('pointerdown', () => {
                this.betPile?.addChip(this[stackName]!.chips.pop()!);
                app.playerState!.setBank(app.playerState!.bank - val);
                app.tableState!.playerSeat.setBet(app.tableState!.playerSeat.bet + val);
                console.log(this.confirmBetButton.interactive);

            })
    }
    
    // initial chip stacks render based on how much money player has in bank
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
