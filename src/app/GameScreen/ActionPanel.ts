/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container, Sprite } from "pixi.js";
import { app } from "../../app";

export default class ActionPanel extends Container {

    background: Sprite;

    splitButton: Sprite;

    doubleButton: Sprite;

    hitButton: Sprite;

    standButton: Sprite;

    surrenderButton: Sprite;

    constructor() {
        super();

        this.background = new Sprite(Assets.cache.get('bg_panel'));
        this.addChild(this.background);

        this.splitButton = new Sprite(Assets.cache.get('button_split'));
        this.splitButton.scale.set(0.7);
        this.splitButton.anchor.set(0.5);
        this.splitButton.x = 200;
        this.splitButton.y = this.background.height*0.5;
        this.splitButton.on('pointerdown', () => {
            app.bus!.emit('split');
            app.bus!.emit('action');
        })
        this.addChild(this.splitButton);

        this.doubleButton = new Sprite(Assets.cache.get('button_double'));
        this.doubleButton.scale.set(0.7);
        this.doubleButton.anchor.set(0.5);
        this.doubleButton.x = this.splitButton.x + this.doubleButton.width + 20;
        this.doubleButton.y = this.splitButton.y;
        this.doubleButton.on('pointerdown', () => {
            app.bus!.emit('double');
            app.bus!.emit('action');
        })
        this.addChild(this.doubleButton)

        this.hitButton = new Sprite(Assets.cache.get('button_hit'));
        this.hitButton.scale.set(0.7);
        this.hitButton.anchor.set(0.5)
        this.hitButton.x = this.doubleButton.x + this.doubleButton.width + 20;
        this.hitButton.y = this.doubleButton.y;
        this.hitButton.on('pointerdown', () => {
            app.bus!.emit('hit');
            app.bus!.emit('action');
        })
        this.addChild(this.hitButton)

        this.standButton = new Sprite(Assets.cache.get('button_stand'));
        this.standButton.scale.set(0.7);
        this.standButton.anchor.set(0.5)
        this.standButton.x = this.hitButton.x + this.hitButton.width + 20;
        this.standButton.y = this.doubleButton.y;
        this.standButton.on('pointerdown', () => {
            app.bus!.emit('stand');
            app.bus!.emit('action');
        })
        this.addChild(this.standButton);

        this.surrenderButton = new Sprite(Assets.cache.get('button_surr'));
        this.surrenderButton.scale.set(0.7);
        this.surrenderButton.anchor.set(0.5)
        this.surrenderButton.x = this.standButton.x + this.surrenderButton.width - 35;
        this.surrenderButton.y = this.doubleButton.y;
        this.surrenderButton.on('pointerdown', () => {
            app.bus!.emit('surrender');
            app.bus!.emit('action');
        })
        this.addChild(this.surrenderButton);
    }
}