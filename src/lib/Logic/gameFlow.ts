/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { table } from "console";
import { Sprite } from "pixi.js";
import { EventEmitter } from "stream";
import { app } from "../../app";
import ActionPanel from "../../app/GameScreen/ActionPanel";
import { PlayerSeatSub, SeatSub } from "../states/sub/SeatSub";
import TableState from "../states/TableState";


export default class Promises {

    buttons: Sprite[];

    playerSeat: PlayerSeatSub;

    dealerSeat: SeatSub;

    tableState: TableState;

    handlePress: Promise<string>;

    bus: EventEmitter;

    constructor() {
        const {splitButton, doubleButton, hitButton, standButton, surrenderButton} = app.gameScreen!.actionPanel
        this.buttons = [splitButton, doubleButton, hitButton, standButton, surrenderButton];
        this.playerSeat = app.tableState!.playerSeat;
        this.dealerSeat = app.tableState!.dealerSeat;
        this.tableState = app.tableState!;
        this.bus = app.bus;
        this.handlePress = handlePress(this);

        this.dealInitial()
        .then(() => {
            this.activateButtons();
            this.act();
        })
    }

    async dealInitial(): Promise<void> {
        this.tableState.clearHands();
        this.tableState.deal(this.dealerSeat);
        this.tableState.deal(this.playerSeat);
        this.tableState.deal(this.dealerSeat);
        this.tableState.deal(this.playerSeat);
    }

    activateButtons(): void {
        this.buttons.forEach((button) => {
            button.interactive = true;
            button.buttonMode = true;
            });
    }

    async act(): Promise<unknown>  {
        const action = await this.handlePress;

        const handler = {
            hit: () => {
                this.tableState.deal(this.tableState.playerSeat);
                return true;
            },
            stand: () => {
                console.log('TODO: STAND ACTION');
                return true;
            },
            surrender: () => {
                console.log('TODO: SURRENDER ACTION')
                return true;
            },
            double: () => {
                console.log('TODO: DOUBLE ACTION')
                return true;
            },
            split:() => {
                this.tableState.playerSeat.split();
                console.log('TODO: SPLIT ACTION')
                return true;
            },
        }
        // @ts-ignore
        return handler[action]();
    }
}

const handlePress = (context: Promises) => {
    const promise = new Promise<string> ((resolve) => {
        context.bus.once('hit', () => {
            resolve('hit');
        });
        context.bus.once('stand', () => {
            resolve('stand');
        });
        context.bus.once('surrender', () => {
            resolve('surrender');
        });
        context.bus.once('double', () => {
            resolve('double');
        });
        context.bus.once('split', () => {
            resolve('split');
        });
    })
    return promise;
}






