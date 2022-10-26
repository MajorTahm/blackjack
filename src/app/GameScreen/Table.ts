/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container, Sprite, Text } from "pixi.js";
import Dealer from "./Dealer";
import Seat from "./Seat";

export default class Table extends Container {

    tableTexture: Sprite;

    title: Text;

    rules: Text;

    dealer: Container;
    
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

        this.dealer = new Dealer;
        this.dealer.setTransform(
            (this.tableTexture.width/2) - 80,
            this.dealer.height/6,
            0.8,
            0.8
        )
        this.addChild(this.dealer);

        this.addChild(this.dealer);

        this.playerSeat = new Seat();
        this.playerSeat.setTransform(
            (this.tableTexture.width/2) - 80,
            this.tableTexture.height/2,
            0.8,
            0.8
        )
        this.addChild(this.playerSeat);
    }
}