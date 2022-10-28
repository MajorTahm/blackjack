/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import { Assets } from "@pixi/assets";
import { Application, Sprite} from "pixi.js";
import GameScreen from "./app/GameScreen/GameScreen";
import Menu from "./app/Menu";
import TableState from "./lib/states/TableState";

// constants
const SIZE = 720;
const CENTER = SIZE / 2;

export class GameApp extends Application {
  tableState?: TableState;

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
  
    Assets.backgroundLoadBundle(['Cards','interface_game']);
    
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
    Assets.loadBundle(['Cards','interface_game']).then(() => {
      this.tableState = new TableState();
      const board = new GameScreen();
      app.stage.addChild(board);
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