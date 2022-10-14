/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import { autorun } from "mobx";
import { Application, Loader, Resource, Text, Texture, Ticker } from "pixi.js";
import Board from "./app/Board";
import BoardBeta from "./app/BoardBeta";
import { player1 } from "./lib/states/PlayerState";
import { CardRank, CardSuit } from "./types";


// constants
const SIZE = 720;
const CENTER = SIZE / 2;


// create and append app
export const app = new Application({
  resolution: window.devicePixelRatio || 1,
  width: 1280,
  height: 720,
  backgroundColor: 0x1099bb, // light blue
  sharedTicker: true,
  sharedLoader: true,
});
document.body.appendChild(app.view);
const loader = Loader.shared;
const ticker = Ticker.shared;

// // preload needed assets
Object.values(CardRank).forEach((rank) => {
  Object.values(CardSuit).forEach((suit) => {
    loader.add(suit + rank, `assets/PNG/Cards/card${suit}${rank}.png`)
  })
})
loader.add('back','assets/PNG/Cards/cardBack_blue1.png');
loader.add('crossButton','assets/uipack_fixed/PNG/red_cross.png');
loader.add('dealButton', 'assets/uipack_fixed/PNG/red_checkmark.png');
loader.add('hit', 'assets/hitmarker.png');
loader.add('stand', 'assets/stando.png');
loader.add('pog', 'assets/pog.png');
loader.add('nowin', 'assets/nowin.png');
loader.add('draw', 'assets/draw.png');

// when loader is ready
loader.load(() => {
  // create and append FPS text
  const fps = new Text("FPS: 0", { fill: 0xffffff });
  app.stage.addChild(fps);

  // create and append hero
  const board = new BoardBeta(player1);
  app.stage.addChild(board)
  const resizeBoard = () => {
    const scale = Math.min(window.innerHeight/ 1920, window.innerWidth / 1080)

    board.setTransform(400, 400, scale, scale)
  }
  resizeBoard()

  window.addEventListener('resize', resizeBoard)

  autorun(() => {
    board.renderPlayerHand(player1);
  })

  // animate hero each "tick": go left or right continuously
  ticker.add(() => {
    fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
  });
});
