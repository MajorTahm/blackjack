/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container, Sprite, Text } from "pixi.js";
import { app } from "../../app";
import Seat from "./Seat/Seat";

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

        this.dealerSeat = new Seat(app.tableState!.dealerSeat);
        this.dealerSeat.setTransform(
            (this.tableTexture.width/2),
            this.dealerSeat.height*2.5,
            0.8,
            0.8
        )
        this.addChild(this.dealerSeat);

        this.addChild(this.dealerSeat);

        this.playerSeat = new Seat(app.tableState!.playerSeat, app.playerState);
        this.playerSeat.setTransform(
            (this.tableTexture.width/2),
            this.tableTexture.height/2,
            0.8,
            0.8
        )
        this.addChild(this.playerSeat);

        
    }
}