/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { Sprite } from "pixi.js";
import { EventEmitter } from "stream";
import { app } from "../../app";
import { PlayerSeatSub, SeatSub } from "../states/sub/SeatSub";
import TableState from "../states/TableState";


export default class Promises {

    buttons: Sprite[];

    playerSeat: PlayerSeatSub;

    dealerSeat: SeatSub;

    tableState: TableState;

    handlePress: Promise<string>;

    confirmBet: Promise<void>;

    bus: EventEmitter;

    constructor() {
        const {splitButton, doubleButton, hitButton, standButton, surrenderButton} = app.gameScreen!.actionPanel;

        this.buttons = [splitButton, doubleButton, hitButton, standButton, surrenderButton];
        this.playerSeat = app.tableState!.playerSeat;
        this.dealerSeat = app.tableState!.dealerSeat;
        this.tableState = app.tableState!;
        this.bus = app.bus;
        this.handlePress = handlePress(this);
        this.confirmBet = confirmBet(this);

        this.openBetModal()
        .then(() => this.dealInitial())
        .then(() => {
            this.setButtonsActive(true);
            this.handleAction();
        })
    }

   async openBetModal(): Promise<void> {
        app.gameScreen!.toggleBetModal();
        return this.confirmBet;
   }

    async dealInitial(): Promise<void> {
        this.tableState.clearHands();
        this.tableState.deal(this.dealerSeat);
        this.tableState.deal(this.playerSeat);
        this.tableState.deal(this.dealerSeat);
        this.tableState.deal(this.playerSeat);
    }

    setButtonsActive(value: boolean): void {
        this.buttons.forEach((button) => {
            button.interactive = value;
            button.buttonMode = value;
            });
    }

    async handleAction(): Promise<unknown>  {
        const action = await this.handlePress;

        const handlerObj = handler(this)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return handlerObj[action]();
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

const confirmBet = (context: Promises) => {
    const promise = new Promise<void> ((resolve) => {
        context.bus.once('betConfirmed', () => {
            resolve();
        })
    })
    return promise;
}

const handler = (context: Promises) => {
    const obj = {
        hit: hit(context),
        stand: stand(context),
        surrender: () => {
            console.log('TODO: SURRENDER ACTION')
            return true;
        },
        double: () => {
            console.log('TODO: DOUBLE ACTION')
            return true;
        },
        split:() => {
        context.tableState.playerSeat.split();
        console.log('TODO: SPLIT ACTION')
        return true;
        }
    }
    return obj
}

const hit = (context: Promises) => {
    context.setButtonsActive(false);
    context.tableState.deal(context.tableState.playerSeat);
    if (context.tableState.playerSeat.score === 21) return 'blackjack';
    if (context.tableState.playerSeat.score > 21) return 'bust';
    // !!REFACTOR THIS
    context.buttons[3].interactive = true;
    context.buttons[3].buttonMode = true;
    context.buttons[2].interactive = true;
    context.buttons[2].buttonMode = true;

    return 'active';
}

const stand = (context: Promises) => {
    context.setButtonsActive(false);
    return 'standing'
}

// TODO: REST BUTTONS




