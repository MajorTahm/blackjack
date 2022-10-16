
import { Graphics, Loader, Resource, Sprite, Text, TextStyle, Texture } from "pixi.js";

export default class Button extends Sprite {

    text: Text;

    constructor(
        text: string = 'press me',
        texture: Texture = Loader.shared.resources.defaultButton.texture as Texture<Resource>,
        ){

        super()
        this.texture = texture;
        this.text = new Text(`${text}`);
        this.text.style = new TextStyle({
            fontFamily: 'Inter',
            fontSize: 34,
            fill: 0xFFFFFF,
        });
        this.addChild(this.text);
        this.buttonMode = true;
        this.anchor.set(0.5 , 0.5);
        this.text.anchor.set(0.5 , 0.55);

        // const graphics = new Graphics();
        // graphics.lineStyle(1, 0xFFBD01, 1);
        // graphics.beginFill(0,0);
        // graphics.drawCircle(0, 0, 50);
        // graphics.endFill();
        // this.addChild(graphics);

        console.log(this)
    }  
}