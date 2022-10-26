import { Assets } from "@pixi/assets";
import { Container, Sprite, Text } from "pixi.js";
import { player1 } from "../lib/states/PlayerState";

export default class PlayerPanel extends Container {
    
    Background: Sprite;
    
    nameText: Text;

    LevelText: Text;

    Avatar: Sprite;

    BankIcon: Sprite;

    BankText: Text;

    constructor() {
        super()
        
        this.Background = new Sprite(Assets.cache.get('player_panel'))
        this.addChild(this.Background);

        this.nameText = new Text(`${player1.PlayerName}`, {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 60,
            fill: 0xffffff,
        });
        this.nameText.x = this.Background.width/3 + 20;
        this.nameText.y = this.Background.height/10;
        this.addChild(this.nameText);

        this.LevelText = new Text(`${player1.PlayerLevel} Level`, {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 60,
            fill: 0xFDDA24
        });
        this.LevelText.x = this.nameText.x;
        this.LevelText.y = this.nameText.y + this.nameText.height + 20;
        this.addChild(this.LevelText);

        this.Avatar = new Sprite(Assets.cache.get('default_avatar_field'));
        this.addChild(this.Avatar);

        this.BankIcon = new Sprite(Assets.cache.get('icon_coin'));
        this.BankIcon.x = 20;
        this.BankIcon.y = this.Avatar.y + this.Avatar.height + 20;
        this.addChild(this.BankIcon);

        this.BankText = new Text(`${player1.bank}`, {
            fontFamily: 'Bebas Neue',
            fontWeight: '700',
            fontSize: 48,
            fill: 0xffffff,
        });
        this.BankText.x = this.BankIcon.x + this.BankIcon.width + 20;
        this.BankText.y = this.BankIcon.y + ((this.BankIcon.height - this.BankText.height)/2);
        this.addChild(this.BankText);

    }
}