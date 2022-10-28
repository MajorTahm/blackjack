/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { autorun } from "mobx";
import { Container, Sprite, Text } from "pixi.js";
import { app } from "../../app";
import Dealer from "./Dealer";
import Seat from "./Seat";

export default class Table extends Container {

    tableTexture: Sprite;

    title: Text;

    rules: Text;

    dealerSeat: Container;
    
    playerSeat: Seat;

    constructor() {
        super()

        this.tableTexture = new Sprite(Assets.cache.get('table_1'));
        this.tableTexture.position = {x: 0,y: 0};
        this.tableTexture.scale = {x: 0.5,y: 0.6};
        this.addChild(this.tableTexture);

        this.title = new Text('BLACKJACK', {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 80,
            fill: 0xffffff,
        });

        this.rules = new Text('TODO dealer must draw to 16...')

        this.dealerSeat = new Dealer;
        this.dealerSeat.setTransform(
            (this.tableTexture.width/2) - 80,
            this.dealerSeat.height/6,
            0.8,
            0.8
        )
        this.addChild(this.dealerSeat);

        this.addChild(this.dealerSeat);

        this.playerSeat = new Seat();
        this.playerSeat.setTransform(
            (this.tableTexture.width/2) - 80,
            this.tableTexture.height/2,
            0.8,
            0.8
        )
        this.addChild(this.playerSeat);

        autorun(() => {
            const playerCards = app.tableState!.playerSeat.cards;
            console.log(playerCards.length)

            if (playerCards.length) {
                this.playerSeat.hand.removeChildren();
                playerCards.forEach((card) => {
                    card.setTransform(
                        card.width/2*playerCards.indexOf(card),
                        card.height/2*playerCards.indexOf(card),
                    )
                this.playerSeat.hand.addChild(card)
                console.log('tried to add a card')
            })  
            }
            console.log('fired render for plaeyer hand')
            console.log(this.playerSeat.hand)
        })
    }
}