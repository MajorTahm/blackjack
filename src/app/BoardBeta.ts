import { Container, Loader, Resource, Sprite, Texture } from "pixi.js";
import { PlayerState } from "../lib/states/PlayerState";
import { CardRank, CardSuit } from "../types";
import Card from "../app/Card"

export default class BoardBeta extends Container {

    playerHand: Container;

    addCardButton: Sprite;

    cardsInDeck: Card[];

    

    constructor(player: PlayerState) {
        super()
        this.playerHand = new Container;
        this.addChild(this.playerHand);

        this.cardsInDeck = [];
        
        this.addCardButton = new Sprite(Loader.shared.resources.hit.texture as Texture<Resource>);
        this.addCardButton.interactive = true;
        this.addCardButton.buttonMode = true;
        this.addCardButton.on('pointerdown', ()=> {
            player.addMainCard(this.cardsInDeck.pop()!);
            console.log(player.mainCards)
        })
        this.addCardButton.setTransform(-200, -200, 0.1, 0.1)
        this.addChild(this.addCardButton);
        
        this.stackDeck();

        this.renderPlayerHand(player);
    }

    stackDeck(): void {
        Object.values(CardRank).forEach((rank) => {
            Object.values(CardSuit).forEach((suit) => {
            // @ts-ignore
                
              this.cardsInDeck.push(new Card(Loader.shared.resources[suit+rank].texture as Texture<Resource>, suit, rank, this.loader))
            })
          })
    }


    renderPlayerHand(tar: PlayerState) {
        if (tar.mainCards.length === 0) return;
        const card = tar.mainCards.at(-1)!
        this.playerHand.addChild(card);
        card.setTransform((tar.mainCards.length * card.width/2),(-tar.mainCards.length * card.height/4));
        // this.playerHand.removeChildren();
        // tar.mainCards.forEach((card) => {
        //     console.log(this.playerHand.children)
        //     card.setTransform((tar.mainCards.length * card.width/2),(-tar.mainCards.length * card.height/4));
        //     this.playerHand.addChild(card);
        //     this.playerHand.sortChildren();
        // })
        // console.log(this.playerHand.children)
    }
}