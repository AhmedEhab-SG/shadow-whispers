import IBeforeInstallPromptEvent from "../interfaces/IBeforeInstallPromptEvent";

class Prompt extends Event {
  private deferredPrompt: IBeforeInstallPromptEvent | null = null;

  public constructor() {
    super("prompt");
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

  private handler = (e: IBeforeInstallPromptEvent): void => {
    e.preventDefault();
    this.deferredPrompt = e;
    this.deferredPrompt.userChoice.then(() => {
      this.deferredPrompt = null;
    });
  };

  public async showInstallPrompt(): Promise<void> {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt().catch(() => {});
    }
  }
}

export default Prompt;
