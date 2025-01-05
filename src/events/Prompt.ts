import IBeforeInstallPromptEvent from "../interfaces/IBeforeInstallPromptEvent";

class Prompt extends Event {
  private deferredPrompt: IBeforeInstallPromptEvent | null = null;

  public constructor() {
    super("beforeinstallprompt");
  }

  public addHandler(): void {
    window.addEventListener(
      "beforeinstallprompt",
      this.handler as EventListener
    );
  }

  public removeHandler(): void {
    window.removeEventListener(
      "beforeinstallprompt",
      this.handler as EventListener
    );
  }

  private handler = (event: IBeforeInstallPromptEvent): void => {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showInstallPrompt();
  };

  public showInstallPrompt(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
      });
    }
  }
}

export default Prompt;
