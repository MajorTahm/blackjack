/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-useless-constructor */
import { Container, Loader, Resource, Sprite, Texture } from "pixi.js";
import { CardRank, CardSuit, CardValue } from "../types";
import Card from "./Card";


export default class Board extends Container {
    hand = new Container();
    
    private loader: Loader;

    cardsInHand: CardValue[] = [];

    cardsInDeck: CardValue[] = [];

    deck: Sprite;

    constructor(loader: Loader){
        super()
        this.hand.y = 150;
        this.loader = loader;
        this.addChild(this.hand);
        this.deck = new Sprite(loader.resources.back.texture as Texture<Resource>);
        this.deck.setTransform(600, -300);
        this.addChild(this.deck);
    }

    stackDeck(): void {
        Object.values(CardRank).forEach((rank) => {
            Object.values(CardSuit).forEach((suit) => {
            // @ts-ignore
              this.cardsInDeck.push(`${suit}${rank}`)
            })
          })
    }
    
    shuffleDeck(): void {
        if (!this.cardsInDeck.length) throw new Error('deck is empty');
        
        for (let i = 0; i < 10; i += 1) {
            this.cardsInDeck.sort(() => Math.random() - 0.5)
        }

    }

    dealToPlayer(): void {
        if (this.cardsInHand.length >= 3) throw new Error('hand is full');
        if (!this.cardsInDeck.length) throw new Error('deck is empty');

        this.addCard(this.cardsInDeck.pop()!)
    }

    addCard(cardName: CardValue): void {
        const cardTexture = this.loader.resources[cardName].texture as Texture<Resource>;
        const card = new Card(cardTexture)
        this.hand.addChild(card);
        card.x = this.cardsInHand.length * card.width/2;
        card.y = -this.cardsInHand.length * card.height/4;
        this.cardsInHand.push(cardName);
        console.log(cardTexture)
    }
}
