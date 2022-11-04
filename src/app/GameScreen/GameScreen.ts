/* eslint-disable import/no-cycle */
import { Assets } from "@pixi/assets";
import { Container, Sprite } from "pixi.js";
import { app } from "../../app";
import ActionPanel from "./ActionPanel";
import MoneyPanel from "./MoneyPanel";
import BetModal from "./BetModal";
import Table from "./Table";

export default class GameScreen extends Container {
    
    background: Sprite;

    actionPanel: ActionPanel;

    table: Table;

    moneyPanel: MoneyPanel;
    
    shopButton: Sprite;
    
    exitButton: Sprite;
    
    settingsButton: Sprite;

    betModal?: BetModal;

    constructor() {
        super()

        this.background = new Sprite(Assets.cache.get('bg_1'))
        this.background.anchor.set(0.5);
        this.background.x = 1280 / 2;
        this.background.y = 960 / 2;
        this.background.width = 1280;
        this.background.height = 960;
        this.addChild(this.background);

        this.table = new Table();
        this.addChild(this.table);
        this.table.width = this.width;

        this.actionPanel = new ActionPanel();
        this.actionPanel.setTransform(
            0,
            (this.background.height - this.actionPanel.height)
        )
        this.addChild(this.actionPanel);

        this.moneyPanel = new MoneyPanel();
        this.moneyPanel.setTransform(
            this.moneyPanel.width/18,
            this.moneyPanel.height/8,
        )
        this.addChild(this.moneyPanel);

        this.shopButton = new Sprite(Assets.cache.get('button_shop'))

        this.exitButton = new Sprite(Assets.cache.get('exitToLobby'));
        this.exitButton.anchor.set(1,0);
        this.exitButton.setTransform(
            this.background.width - 20,
            20,
            0.5,
            0.5
        );
        this.exitButton.interactive = true;
        this.exitButton.buttonMode = true;
        this.exitButton.on('pointerdown', () => {
            this.destroy();
            app.makeMenuScreen();
        })
        this.addChild(this.exitButton);

        this.settingsButton = new Sprite(Assets.cache.get('button_setting'));

        this.showBetModal();
    }

    showBetModal() {

        this.betModal = new BetModal();
        this.betModal.scale.set(0.5);
        this.addChild(this.betModal);
        this.betModal.position.set(this.background.width/2 - this.betModal.width/2, this.background.height/2 - this.betModal.height/2);
    }
}