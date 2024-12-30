import BaseKeys from "../../enum/BaseKeys";
import { ControlActions } from "../../types/events";
import { GameStates } from "../../types/game";
import Sprite from "../../utils/Sprite";

abstract class UI extends Sprite {
  private _text: string = "";
  private _fontFamily: "Creepster, cursive" | "Bangers, cursive" =
    "Creepster, cursive";
  private _fontSize: number = 30;
  private _color: string = "black";
  private _textX: number = 0;
  private _textY: number = 0;

  private _imgX: number = 0;
  private _imgY: number = 0;
  private _imgSize: number = 0;
  private _drawImg: boolean = false;
  private _shadowColor: string = "white";

  private _textWidth: number = 0;
  private _textHeight: number = 0;

  private _markForDelete: boolean = false;

  public destroy(): void {
    this._markForDelete = true;
  }

  protected isClicked(controlActions: ControlActions): boolean {
    return (
      controlActions.x > this.textX &&
      controlActions.x < this.textX + this.textWidth &&
      controlActions.y > this.textY - this.textHeight &&
      controlActions.y < this.textY &&
      controlActions.isClick
    );
  }

  protected isHover(controlActions: ControlActions): boolean {
    return (
      controlActions.x > this.textX &&
      controlActions.x < this.textX + this.textWidth &&
      controlActions.y > this.textY - this.textHeight &&
      controlActions.y < this.textY
    );
  }

  protected isHold(controlActions: ControlActions): boolean {
    return (
      controlActions.x > this.textX &&
      controlActions.x < this.textX + this.textWidth &&
      controlActions.y > this.textY - this.textHeight &&
      controlActions.y < this.textY &&
      controlActions.isHold
    );
  }

  abstract update({}: {
    deltaTime: number;
    keys: BaseKeys[];
    controlActions: ControlActions;
    gameSpeed: number;
    score: number;
    scorePerLevel: number;
    level: number;
    time: number;
    timeLimit: number;
    hero: { energy: number; lives: number };
    gameStates: GameStates;
  }): void;

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.shadowColor = this._shadowColor;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    ctx.font = `${this._fontSize}px ${this._fontFamily}`;
    ctx.fillStyle = this._color;
    ctx.fillText(this._text, this._textX, this._textY);

    this._textWidth = ctx.measureText(this.text).width;
    this._textHeight = ctx.measureText(this.text).actualBoundingBoxAscent;

    if (this.imgLoaded && this.image.src && this._drawImg)
      ctx.drawImage(
        this.image,
        this._imgX,
        this._imgY,
        this._imgSize,
        this._imgSize
      );

    ctx.restore();
  }

  // Getters and Setters

  protected get text(): string {
    return this._text;
  }

  protected get textWidth(): number {
    return this._textWidth;
  }

  protected set textWidth(textWidth: number) {
    this._textWidth = textWidth;
  }

  protected get textHeight(): number {
    return this._textHeight;
  }

  protected set textHeight(textHeight: number) {
    this._textHeight = textHeight;
  }

  protected set text(text: string) {
    this._text = text;
  }

  protected get fontFamily(): "Creepster, cursive" | "Bangers, cursive" {
    return this._fontFamily;
  }

  protected set fontFamily(
    fontFamily: "Creepster, cursive" | "Bangers, cursive"
  ) {
    this._fontFamily = fontFamily;
  }

  protected get fontSize(): number {
    return this._fontSize;
  }

  protected set fontSize(fontSize: number) {
    this._fontSize = fontSize;
  }

  protected set color(color: string) {
    this._color = color;
  }

  protected get textX(): number {
    return this._textX;
  }

  protected set textX(textX: number) {
    this._textX = textX;
  }

  protected get textY(): number {
    return this._textY;
  }

  protected set textY(textY: number) {
    this._textY = textY;
  }

  protected get imgX(): number {
    return this._imgX;
  }

  protected set imgX(imgX: number) {
    this._imgX = imgX;
  }

  protected get imgY(): number {
    return this._imgY;
  }

  protected set imgY(imgY: number) {
    this._imgY = imgY;
  }

  protected get imgSize(): number {
    return this._imgSize;
  }

  protected set imgSize(imgSize: number) {
    this._imgSize = imgSize;
  }

  protected get shadowColor(): string {
    return this._shadowColor;
  }

  protected set shadowColor(shadowColor: string) {
    this._shadowColor = shadowColor;
  }

  protected get drawImg(): boolean {
    return this._drawImg;
  }

  protected set drawImg(drawImg: boolean) {
    this._drawImg = drawImg;
  }

  public get markForDelete(): boolean {
    return this._markForDelete;
  }
}

export default UI;
