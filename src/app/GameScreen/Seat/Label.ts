/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container, Sprite, Text } from "pixi.js";
import { app } from "../../../app";
import { PlayerState } from "../../../lib/states/PlayerState";

export default class Label extends Container {

    background: Sprite;

    playerState: PlayerState;

    avatar: Sprite;

    nameText: Text;

    bankText: Text;

    constructor(playerState: PlayerState) {
        
        super()

        this.background = new Sprite(Assets.cache.get('avatar_player_active_1'));
        this.addChild(this.background)

        this.playerState = playerState;

        this.avatar = playerState.avatar;
        this.avatar.scale.set(this.background.height/playerState.avatar.height)
        this.addChild(this.avatar)

        this.nameText = new Text (`${app.playerState!.PlayerName}`, {
            fontFamily: 'Bebas Neue',
            fontWeight: '600',
            fontSize: 40,
            fill: 0xFDDA24,
        });
        this.nameText.anchor.set(0.5, 0.5)
        this.nameText.x = this.width/3 * 2;
        this.nameText.y = this.height/10 * 3;
        this.addChild(this.nameText);

        this.bankText = new Text (`$ ${app.playerState!.bank}`, {
            fontFamily: 'Bebas Neue',
            fontWeight: '600',
            fontSize: 40,
            fill: 0xFDDA24,
        });
        this.bankText.anchor.set(this.nameText.anchor.x, this.nameText.anchor.y)
        this.bankText.x = this.nameText.x;
        this.bankText.y = this.nameText.y + this.bankText.height/2 + this.height/10* 2;
        this.addChild(this.bankText)
    }
}