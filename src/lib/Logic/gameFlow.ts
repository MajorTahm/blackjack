/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { table } from "console";
import { app } from "../../app";
import ActionPanel from "../../app/GameScreen/ActionPanel";


export default class Promises {

    constructor() {
        const {splitButton, doubleButton, hitButton, standButton, surrenderButton} = app.gameScreen!.actionPanel
        const buttons = [splitButton, doubleButton, hitButton, standButton, surrenderButton];
        const {playerSeat} = app.tableState!;
        const {dealerSeat} = app.tableState!;
        const tableState = app.tableState!;

        const handlePress: Promise<string> = new Promise ((resolve) => {
            app.bus.once('hit', () => {
                resolve('hit');
            });
            app.bus.once('stand', () => {
                resolve('stand');
            });
            app.bus.once('surrender', () => {
                resolve('surrender');
            });
            app.bus.once('double', () => {
                resolve('double');
            });
            app.bus.once('split', () => {
                resolve('split');
            });
        })
        
        const roundStart = new Promise((resolve) => {
            tableState.clearHands();
            tableState.deal(dealerSeat);
            tableState.deal(playerSeat);
            tableState.deal(dealerSeat);
            tableState.deal(playerSeat);
            resolve(true);
        })

        // !!REFACTOR THIS TO ASYNC
        const roundActionStage = roundStart.then((res) => {
            if (res) {
                buttons.forEach((button) => {
                button.interactive = true;
                button.buttonMode = true;
                });
            
                const act = handlePress.then((action: string) => {
                    const handler = {
                        hit: () => {
                            tableState.deal(tableState.playerSeat);
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
                            tableState.playerSeat.split();
                            console.log('TODO: SPLIT ACTION')
                            return true;
                        },
                    }
                    // @ts-ignore
                    handler[action]();
                })
            return(act);
            }
        })
    }
}








