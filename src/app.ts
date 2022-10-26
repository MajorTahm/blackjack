/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import { Assets } from "@pixi/assets";
import { Application, Sprite} from "pixi.js";
import GameScreen from "./app/GameScreen/GameScreen";
import Menu from "./app/Menu";

// constants
const SIZE = 720;
const CENTER = SIZE / 2;

// create and append app
const app = new Application({ 
  backgroundColor: 0x1099bb,
  width: 1280,
  height: 960
});
document.body.appendChild(app.view);

async function init() {
  await Assets.init({manifest: "./assets/manifest.json"});

  Assets.backgroundLoadBundle(['Cards','interface_game']);
  
  makeGameScreen();
}

export async function makeLoadScreen(): Promise<void> {
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
      makeMenuScreen();
  });
}

export async function makeGameScreen(): Promise<void> {
  Assets.loadBundle(['Cards','interface_game']).then(() => {
    const board = new GameScreen();
    app.stage.addChild(board);
  })
  
}

export async function makeMenuScreen(): Promise<void> {
    Assets.loadBundle('menu').then(() => {
      const menuScreen = new Menu();
      app.stage.addChild(menuScreen);
    });
};

init();
