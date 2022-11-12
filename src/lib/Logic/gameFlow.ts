// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable import/no-cycle */
// /* eslint-disable no-return-assign */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-use-before-define */
// /* eslint-disable import/prefer-default-export */
// import { Sprite } from "pixi.js";
// import { EventEmitter } from "eventemitter3";
// import { app } from "../../app";
// import { PlayerSeatSub, SeatSub } from "../states/sub/SeatSub";
// import TableState from "../states/TableState";


// export default class Promises {

//     buttons: Sprite[];

//     playerSeat: PlayerSeatSub;

//     dealerSeat: SeatSub;

//     tableState: TableState;

//     handlePress: Promise<string>;

//     confirmBet: Promise<void>;

//     bus: typeof app.bus;

//     constructor() {
//         const {splitButton, doubleButton, hitButton, standButton, surrenderButton} = app.gameScreen!.actionPanel;

//         this.buttons = [splitButton, doubleButton, hitButton, standButton, surrenderButton];
//         this.playerSeat = app.tableState!.playerSeat;
//         this.dealerSeat = app.tableState!.dealerSeat;
//         this.tableState = app.tableState!;
//         this.bus = app.bus;
//         this.handlePress = handlePress(this);
//         this.confirmBet = confirmBet(this);

//         this.openBetModal()
//         .then(() => this.dealInitial())
//         .then(async (): Promise<string> => {
//             this.setButtonsActive(true);
//             return this.handleAction();
//         })
//         .then(() => this.mainCycle()
//         );
//     }

//    async openBetModal(): Promise<void> {
//         app.gameScreen!.toggleBetModal();
//         return this.confirmBet;
//    }

//     async dealInitial(): Promise<void> {
//         this.tableState.clearHands();
//         this.tableState.deal(this.dealerSeat);
//         this.tableState.deal(this.playerSeat);
//         this.tableState.deal(this.dealerSeat);
//         this.tableState.deal(this.playerSeat);
//     }

//     setButtonsActive(value: boolean): void {
//         this.buttons.forEach((button) => {
//             button.interactive = value;
//             button.buttonMode = value;
//             });
//     }

//     async handleAction(): Promise<string>  {
//         const action = await this.handlePress;

//         const handlerObj = handler(this)
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         return handlerObj[action]();
//     }

//     mainCycle() {
//         switch (app.tableState!.playerSeat.phase) {
//             case 'initial': {
//                 return;
//             }
            
//             case 'active': {
//                 return;
//             }

//             case 'split': {
//                 app.tableState!.deal(this.playerSeat);
//                 return;
//             }
//             default: {
//                 console.log('TODO: DEALER`S TRURN AND RESOLVE')
//             }
//         }
//     }
// }

// const handlePress = (context: Promises) => {
//     const promise = new Promise<string> ((resolve) => {
//         context.bus.once('hit', () => {
//             resolve('hit');
//         });
//         context.bus.once('stand', () => {
//             resolve('stand');
//         });
//         context.bus.once('surrender', () => {
//             resolve('surrender');
//         });
//         context.bus.once('double', () => {
//             resolve('double');
//         });
//         context.bus.once('split', () => {
//             resolve('split');
//         });
        
//     })
//     return promise;
// }

// const confirmBet = (context: Promises) => {
//     const promise = new Promise<void> ((resolve) => {
//         context.bus.once('betConfirmed', () => {
//             resolve();
//         })
//     })
//     return promise;
// }

// const handler = (context: Promises) => {
//     const obj = {
//         hit:() => hit(context),
//         stand:() => stand(context),
//         surrender: () => surrender(context),
//         double:() => double(context),
//         split:() => split(context),
//     }
//     return obj
// }

// const hit = (context: Promises) => {
//     context.setButtonsActive(false);
//     app.tableState!.deal(app.tableState!.playerSeat);
//     if (app.tableState!.playerSeat.score >= 21) { 
//         app.tableState!.playerSeat.setPhase('inactive');
//     } else {
//         app.tableState!.playerSeat.setPhase('active');
//     }
//     console.log('hit');
//     return 'hit';
// }

// const stand = (context: Promises) => {
//     context.setButtonsActive(false);
//     app.tableState!.playerSeat.setPhase('inactive')
//     console.log('stand');
//     return 'stand'
// }

// const surrender = (context: Promises) => {
//     context.setButtonsActive(false);
//     app.playerState!.setBank(app.playerState!.bank + app.tableState!.playerSeat.bet/2);
//     app.tableState!.playerSeat.bet = app.tableState!.playerSeat.bet/2;
//     app.tableState!.playerSeat.setPhase('inactive')
//     console.log('surrender');
//     return 'surrender'
// }

// const double = (context: Promises) => {
//     context.setButtonsActive(false);
//     const seatBet = app.tableState!.playerSeat.bet;
//     app.playerState!.setBank(app.playerState!.bank - seatBet);
//     app.tableState!.playerSeat.bet = seatBet*2;
//     app.tableState!.deal(app.tableState!.playerSeat);
//     app.tableState!.playerSeat.setPhase('inactive');
//     console.log('double');
//     return 'double';
// }

// const split = (context: Promises) => {
//     context.setButtonsActive(false);
//     app.tableState!.playerSeat.split();
//     app.tableState!.playerSeat.setPhase('split');
//     console.log('split');
//     return 'split'
// }