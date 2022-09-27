/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import { Application, Loader, Resource, Text, Texture, Ticker } from "pixi.js";
import Board from "./app/Board";
import Card from "./app/Card";
import { CardRank, CardSuit } from "./types";


// constants
const SIZE = 720;
const CENTER = SIZE / 2;


// create and append app
const app = new Application({
  resolution: window.devicePixelRatio || 1,
  resizeTo: window,
  backgroundColor: 0x1099bb, // light blue
  sharedTicker: true,
  sharedLoader: true,
});
document.body.appendChild(app.view);
const loader = Loader.shared;
const ticker = Ticker.shared;

// // preload needed assets
// loader.add("aceOfSpades", "assets/PNG/Cards/cardSpadesA.png");
// loader.add("aceOfHearts", "assets/PNG/Cards/cardHeartsA.png");
Object.values(CardRank).forEach((rank) => {
  Object.values(CardSuit).forEach((suit) => {
    loader.add(suit + rank, `assets/PNG/Cards/card${suit}${rank}.png`)
  })
})
loader.add('back','assets/PNG/Cards/cardBack_blue1.png')

// when loader is ready
loader.load(() => {
  // create and append FPS text
  const fps = new Text("FPS: 0", { fill: 0xffffff });
  app.stage.addChild(fps);

  // create and append hero
  const board = new Board(loader)
  app.stage.addChild(board)
  const resizeBoard = () => {
    const scale = Math.min(window.innerHeight/ 1920, window.innerWidth / 1080)

    board.setTransform(window.innerWidth/2, window.innerHeight/2, scale, scale)
  }
  resizeBoard()

  window.addEventListener('resize', resizeBoard)

  board.stackDeck();
  board.shuffleDeck();

  board.dealToPlayer();
  board.dealToPlayer();

  console.log(board.cardsInDeck)

  

  // animate hero each "tick": go left or right continuously
  ticker.add(() => {
    fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
  });
});
