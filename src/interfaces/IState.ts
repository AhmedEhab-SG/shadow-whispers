import DefaultKeys from "../enum/BaseKeys";

interface IState {
  enter(): void;
  keysHandler(keys: DefaultKeys[]): void;
  exit(): void;
}

export default IState;
