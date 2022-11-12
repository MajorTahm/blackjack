/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import { Assets } from "@pixi/assets";
import { Application, Sprite} from "pixi.js";
import EventEmitter from 'eventemitter3';
import GameScreen from "./app/GameScreen/GameScreen";
import Table from "./app/GameScreen/Table";
import Menu from "./app/Menu";
import PlayerState from "./lib/states/PlayerState";
import TableState from "./lib/states/TableState";
import Logic from "./lib/Logic/gameFlow2";

// constants
const SIZE = 720;
const CENTER = SIZE / 2;

export class GameApp extends Application {
  tableState?: TableState;
  
  playerState?: PlayerState;

  gameScreen?: GameScreen;

  bus?: EventEmitter;

  logic?: Logic;

  constructor() {
    super({ 
      backgroundColor: 0x1099bb,
      width: 1280,
      height: 960
    });
    
    document.body.appendChild(this.view);

    this.init();
  }

  async init(): Promise<void> {
    await Assets.init({manifest: "./assets/manifest.json"});
  
    Assets.backgroundLoadBundle(['Cards','interface_game','menu', 'chips', 'betmodal']);
    
    this.makeGameScreen();
    
  }
  
  async makeLoadScreen(): Promise<void> {
    const loadScreenAssets = await Assets.loadBundle('interface_game');
    
    const goNext = new Sprite(loadScreenAssets.button_setting);
    goNext.anchor.set(0.5);
      goNext.x = app.screen.width / 2;
      goNext.y = app.screen.height / 2;
      app.stage.addChild(goNext);
  
      goNext.interactive = true;
      goNext.buttonMode = true;
  
      goNext.on('pointertap', async () => {
        goNext.destroy();
        this.makeMenuScreen();
    });
  }
  
  async makeGameScreen(): Promise<void> {
    Assets.loadBundle(['Cards','interface_game', 'menu', 'chips', 'betmodal']).then(() => {
      this.tableState = new TableState();
      this.playerState = new PlayerState();
      this.bus = new EventEmitter();
      this.gameScreen = new GameScreen();
      this.logic = new Logic();
      app.stage.addChild(this.gameScreen);
    })
    
  }
  
  async makeMenuScreen(): Promise<void> {
      Assets.loadBundle('menu').then(() => {
        const menuScreen = new Menu();
        this.stage.addChild(menuScreen);
      });
  };
}

export const app = new GameApp();