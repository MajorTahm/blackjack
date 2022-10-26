import { Assets } from "@pixi/assets";
import { Container, Sprite, Text } from "pixi.js";

export default class ScoreBadge extends Container {
    background: Sprite;

    score: Text;

    constructor() {
        super()

        this.background = new Sprite(Assets.cache.get('button_sq'));
        this.background.anchor.set(0.5);
        this.position.set(0, 0);
        this.background.scale.set(0.5, 0.5);
        this.addChild(this.background);

        this.score = new Text(`99`, {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 36,
            fill: 0xffffff,
        });
        this.score.scale.set(0.8);
        this.score.anchor.set(0.5);
        this.position.set(-this.width, this.height*2);
        this.addChild(this.score);
    }
}