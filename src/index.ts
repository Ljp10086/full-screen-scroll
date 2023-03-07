import { Options } from "./types";

export class FullPageScreen {
  container: HTMLElement;
  sections: NodeListOf<HTMLElement>;

  constructor(opts: Options) {
    this.container = opts.container;
    this.sections = this.container.querySelectorAll('data-page');
  }

  onMouseWheel = (ev: MouseEvent) => {
    
  }

  dispose(): void {
    this.container = null!;
  }
}