/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { autorun } from "mobx";
import { Container, Sprite, Text } from "pixi.js";
import { app } from "../../app";

const SCALE = 0.7;

export default class MoneyPanel extends Container {

    background: Sprite;

    betTitle: Text;

    paidTitle: Text;

    balanceTitle: Text;

    bet: Text;

    balance: Text;

    constructor() {
        super()

        this.background = new Sprite(Assets.cache.get('win_bid'));
        this.background.scale.set(0.7);
        this.addChild(this.background);

        this.betTitle = new Text('BET:', {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 60,
            fill: 0x000000,
        });
        this.betTitle.anchor.set(0,1);
        this.betTitle.setTransform(
            35,
            this.background.height/2 - 15,
            SCALE,
            SCALE
        )
        this.addChild(this.betTitle);

        this.paidTitle = new Text('PAID:', {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 60,
            fill: 0x000000,
        });
        this.paidTitle.anchor.set(0,1);
        this.paidTitle.setTransform(
            this.background.width/2,
            this.betTitle.y,
            SCALE,
            SCALE
        );
        this.addChild(this.paidTitle);

        this.balanceTitle = new Text('BALANCE:',  {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 60,
            fill: 0x000000,
        });
        this.balanceTitle.anchor.set(1,0);
        this.balanceTitle.setTransform(
            this.background.width/2,
            this.background.height/2 + 8,
            SCALE,
            SCALE
        )
        this.addChild(this.balanceTitle);

        this.bet = new Text(`$ TODO`,  {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 60,
            fill: 0x510000,
        });
        this.bet.anchor.set(0,1);
        this.bet.setTransform(
            this.betTitle.x + this.betTitle.width + 10,
            this.background.height/2 - 15,
            SCALE,
            SCALE
        );
        this.addChild(this.bet)

        this.balance = new Text(`$ ${app.playerState!.bank}`, {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 60,
            fill: 0x510000,
        });
        this.balance.anchor.set(0,0);
        this.balance.setTransform(
            this.balanceTitle.x + 20,
            this.balanceTitle.y,
            SCALE,
            SCALE
        );
        this.addChild(this.balance);

        autorun(() => {
            this.balance.text = app.playerState!.bank
        })
    }
}