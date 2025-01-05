import IBeforeInstallPromptEvent from "../interfaces/IBeforeInstallPromptEvent";

class Prompt extends Event {
  private deferredPrompt?: IBeforeInstallPromptEvent;

  public constructor() {
    super("prompt");
  }

  public addHandler(): void {
    window.addEventListener(
      "beforeinstallprompt",
      this.handler as unknown as EventListener
    );
  }

  public removeHandler(): void {
    window.removeEventListener(
      "beforeinstallprompt",
      this.handler as unknown as EventListener
    );
  }

  private handler = async (e: IBeforeInstallPromptEvent): Promise<void> => {
    e.preventDefault();
    this.deferredPrompt = e;
    await this.showInstallPrompt();
  };

  public async showInstallPrompt(): Promise<void> {
    try {
      if (!this.deferredPrompt) return;
      await this.deferredPrompt.prompt();
      await this.deferredPrompt.userChoice;
      this.deferredPrompt = undefined;
    } catch {}
  }
}

export default Prompt;
