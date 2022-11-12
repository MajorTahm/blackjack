import EventEmitter from "eventemitter3";
import { app } from "../../app";
import ActionPanel from "../../app/GameScreen/ActionPanel";
import GameScreen from "../../app/GameScreen/GameScreen";
import { PlayerCurrentPhase } from "../../types";
import PlayerState from "../states/PlayerState";
import { PlayerSeatSub } from "../states/sub/SeatSub";
import TableState from "../states/TableState";

const removeListeners = () => {
    const btns = ['hit', 'stand', 'split', 'double', 'surrender'];
    btns.forEach((phase) => app.bus?.removeAllListeners(phase));
}

export default class Logic {
    playerSeat: PlayerSeatSub;
    
    tableState: TableState;

    gameScreen: GameScreen;

    actionPanel: ActionPanel;

    bus: EventEmitter;

    playerState: PlayerState;

    constructor() {
        this.tableState = app.tableState!;
        this.playerState = app.playerState!
        this.playerSeat = this.tableState.playerSeat;
        this.gameScreen = app.gameScreen!
        this.actionPanel = this.gameScreen.actionPanel;
        this.bus = app.bus!;

        this.openBetModal()
        .then(() => {
            this.dealInitial();
            this.cycle();
        })
        
    }

    async openBetModal() {
        this.gameScreen.toggleBetModal();
        const confirm = new Promise<void> ((resolve) => {
            this.bus.once('betConfirmed', () => {
                this.bus.removeAllListeners('betConfirmed');
                resolve();
            })
        })
        return confirm;
    }

    deactivateAllButtons() {
        // eslint-disable-next-line no-param-reassign, no-return-assign
        this.actionPanel.children.forEach((child) => child.interactive = false)
    }

    dealInitial() {
        this.tableState.deal(this.tableState.dealerSeat);
        this.tableState.deal(this.tableState.dealerSeat);
        this.tableState.deal(this.playerSeat);
        this.tableState.deal(this.playerSeat);
        this.playerSeat.phase = 'initial';
    }

    activateButtons(currentPhase: PlayerCurrentPhase) {
        if (currentPhase === 'initial') {
            if (this.playerSeat.score >= 21) {
                this.playerSeat.phase = 'inactive';
                return;
            }

            if (this.playerSeat.cards[0].cardScore === this.playerSeat.cards[1].cardScore) {

                // SPLIT
                this.actionPanel.splitButton.interactive = true;
                this.bus.on('split', () => {
                    this.deactivateAllButtons();
                    this.playerSeat.split();
                    this.tableState.deal(this.playerSeat);
                    console.log(this.playerSeat.score, this.playerSeat.scoreOff)
                    this.playerSeat.setPhase('split');
                    removeListeners();
                    console.log('split');
                })
            }

            // HIT
            this.actionPanel.hitButton.interactive = true;
            this.bus.on('hit', () => {
                this.deactivateAllButtons();
                this.tableState.deal(this.playerSeat);
                if (this.playerSeat.score >= 21) { 
                    this.playerSeat.setPhase('inactive');
                } else {
                    this.playerSeat.setPhase('active');
                }
                removeListeners();
                console.log('hit');
            })

            // STAND
            this.actionPanel.standButton.interactive = true;
            this.bus.on('stand', () => {
                this.deactivateAllButtons();
                this.playerSeat.setPhase('inactive');
                removeListeners();
                console.log('stand');
            })

            // SURRENDER
            this.actionPanel.surrenderButton.interactive = true;
            this.bus.on('surrender', () => {
                this.deactivateAllButtons();
                this.playerState.setBank(this.playerState.bank + Math.floor(this.playerSeat.bet/2));
                this.playerSeat.bet = Math.ceil(this.playerSeat.bet/2);
                this.playerSeat.setPhase('inactive');
                removeListeners();
                console.log('surrender');
            })

            // DOUBLE
            this.actionPanel.doubleButton.interactive = true;
            this.bus.on('double', () => {
                this.deactivateAllButtons();
                const seatBet = this.playerSeat.bet;
                this.playerState.setBank(this.playerState.bank - seatBet);
                this.playerSeat.bet = seatBet*2;
                this.tableState.deal(this.playerSeat);
                this.playerSeat.setPhase('inactive');
                removeListeners();
                console.log('double');
            })
            return;
        }
        if (currentPhase === "active") {
            if (this.playerSeat.score >= 21) {
                this.playerSeat.phase = 'inactive';
                return;
            }

            this.actionPanel.hitButton.interactive = true;
            this.bus.on('hit', () => {
                this.deactivateAllButtons();
                this.tableState.deal(this.playerSeat);
                if (this.playerSeat.score >= 21) { 
                    this.playerSeat.setPhase('inactive');
                } else {
                    this.playerSeat.setPhase('active');
                }
                removeListeners();
                console.log('hit');
            });

            this.actionPanel.standButton.interactive = true;
            this.bus.on('stand', () => {
                this.deactivateAllButtons();
                this.playerSeat.setPhase('inactive');
                removeListeners();
                console.log('stand');
            });
        }

    }

    async cycle(): Promise<any> {
        if (this.playerSeat.phase === 'inactive') {
            console.log('TODO: ROUND RESOLVER');
            return;
        }

        this.activateButtons(this.playerSeat.phase);      

        const action = new Promise<void> (resolve => {
            this.bus.on('action', () => {
                this.bus.removeAllListeners('action');
                resolve()
            })
        });

        action.then(() => this.cycle());
    }
}

