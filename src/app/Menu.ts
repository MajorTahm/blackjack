/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container, Sprite } from "pixi.js";
import { makeGameScreen } from "../app";
import PlayerPanel from "./PlayerPanel";

const SCALE = 0.7;

export default class Menu extends Container {
    Background: Sprite;

    PlayButton: Sprite;

    FreeSpinButton: Sprite;

    ChatButton: Sprite;

    FriendsButton: Sprite;

    ShopButton: Sprite;

    SettingsButton: Sprite;

    playerPanel: PlayerPanel;

    constructor() {
        super();

        this.Background = new Sprite(Assets.cache.get('bg_1'))
        this.Background.anchor.set(0.5);
        this.Background.x = 1280 / 2;
        this.Background.y = 960 / 2;
        this.Background.width = 1280;
        this.Background.height = 960;
        this.addChild(this.Background);

        this.PlayButton = new Sprite(Assets.cache.get('button_play'));
        this.PlayButton.anchor.set(0.5);
        this.PlayButton.setTransform(
            this.Background.width/2,
            (this.Background.height/4) * 3,
            SCALE,
            SCALE
            )
        this.PlayButton.buttonMode = true;
        this.PlayButton.interactive = true;
        this.PlayButton.on('pointerdown', () => {
            this.destroy();
            makeGameScreen();
        })
        this.addChild(this.PlayButton);

        this.FreeSpinButton = new Sprite(Assets.cache.get('button_free_spin'));
        this.FreeSpinButton.anchor.set(0.5);
        this.FreeSpinButton.setTransform(
            this.PlayButton.x,
            this.PlayButton.y + this.PlayButton.height + 20,
            SCALE,
            SCALE
            );
        this.FreeSpinButton.buttonMode = true;
        this.FreeSpinButton.interactive = true;
        this.addChild(this.FreeSpinButton);

        this.ChatButton = new Sprite(Assets.cache.get('button_chat'));
        this.ChatButton.anchor.set(0.5);
        this.ChatButton.setTransform(
           this.ChatButton.width/2,
           this.ChatButton.height/2,
           SCALE,
           SCALE
        );
        this.ChatButton.buttonMode = true;
        this.ChatButton.interactive = true;
        this.addChild(this.ChatButton);

        this.FriendsButton = new Sprite(Assets.cache.get('button_friends'));
        this.FriendsButton.anchor.set(0.5)
        this.FriendsButton.setTransform(
            this.ChatButton.x + (this.ChatButton.width * 1.2),
            this.ChatButton.y,
            SCALE,
            SCALE
        );
        this.FriendsButton.buttonMode = true;
        this.FriendsButton.interactive = true;
        this.addChild(this.FriendsButton);

        this.SettingsButton = new Sprite(Assets.cache.get('button_setting'));
        this.SettingsButton.anchor.set(0.5)
        this.SettingsButton.setTransform(
            this.Background.width - this.SettingsButton.width/2,
            this.SettingsButton.width/2,
            SCALE,
            SCALE
        );
        this.SettingsButton.buttonMode = true;
        this.SettingsButton.interactive = true;
        this.addChild(this.SettingsButton);

        this.ShopButton = new Sprite(Assets.cache.get('button_shop'));
        this.ShopButton.anchor.set(0.5);
        this.ShopButton.setTransform(
            this.SettingsButton.x - this.ShopButton.width/2,
            this.SettingsButton.y,
            SCALE,
            SCALE
        );
        this.ShopButton.buttonMode = true;
        this.ShopButton.interactive = true;
        this.addChild(this.ShopButton);

        this.playerPanel = new PlayerPanel();
        this.playerPanel.setTransform(
            this.ChatButton.x - this.ChatButton.width/2,
            730,
            SCALE,
            SCALE
        );
        this.addChild(this.playerPanel);
    }
}