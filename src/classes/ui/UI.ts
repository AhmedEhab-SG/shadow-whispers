import BaseKeys from "../../enum/BaseKeys";
import { ControlActions } from "../../types/events";
import { GameStates } from "../../types/game";
import { GameSave } from "../../types/save";
import Sprite from "../../utils/Sprite";

abstract class UI extends Sprite {
  private _text: string = "";
  private _fontFamily: "Creepster, cursive" | "Bangers, cursive" | "Arial" =
    "Creepster, cursive";
  private _fontSize: number = 30;
  private _fontWeight: "normal" | "bold" | "bolder" | "lighter" | number =
    "normal";
  private _fontStyle: "normal" | "italic" | "oblique" = "normal";
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

  private _firingClick: boolean = false;

  public destroy(): void {
    this._markForDelete = true;
  }

  private isClicked(controlActions: ControlActions): boolean {
    return (
      controlActions.x > this.textX &&
      controlActions.x < this.textX + this.textWidth &&
      controlActions.y > this.textY - this.textHeight &&
      controlActions.y < this.textY &&
      controlActions.isClick
    );
  }

  private clicked(controlActions: ControlActions): void {
    controlActions.isClick = false;
  }

  protected click(controlActions: ControlActions, fun: () => void): void {
    if (this.isClicked(controlActions)) {
      this.color = "grey";
      this.shadowColor = "none";

      if (this._firingClick) return;
      this._firingClick = true;

      const id = setTimeout(() => {
        fun();
        this.clicked(controlActions);
        clearTimeout(id);
        this._firingClick = false;
      }, 100);
    }
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

  protected isMobileDevice(): boolean {
    const userAgent = navigator.userAgent;
    return (
      /android|bb\d+|meego.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        userAgent.substring(0, 4)
      )
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
    highScore: number;
    hero: { energy: number; lives: number };
    gameStates: GameStates;
    gameSave: GameSave | null;
  }): void;

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.shadowColor = this._shadowColor;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    ctx.font = `${this._fontStyle} ${this._fontWeight} ${this._fontSize}px ${this._fontFamily}`;
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

  protected get fontFamily():
    | "Creepster, cursive"
    | "Bangers, cursive"
    | "Arial" {
    return this._fontFamily;
  }

  protected set fontFamily(
    fontFamily: "Creepster, cursive" | "Bangers, cursive" | "Arial"
  ) {
    this._fontFamily = fontFamily;
  }

  protected get fontWeight():
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | number {
    return this._fontWeight;
  }

  protected set fontWeight(
    fontWeight: "normal" | "bold" | "bolder" | "lighter" | number
  ) {
    this._fontWeight = fontWeight;
  }

  protected get fontStyle(): "normal" | "italic" | "oblique" {
    return this._fontStyle;
  }

  protected set fontStyle(fontStyle: "normal" | "italic" | "oblique") {
    this._fontStyle = fontStyle;
  }

  protected get fontSize(): number {
    return this._fontSize;
  }

  protected set fontSize(fontSize: number) {
    this._fontSize = fontSize;
  }

  protected get color(): string {
    return this._color;
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
