import { Options } from "./types";
import { clamp } from "./utils";

export default class FullPageScreen {
  container: HTMLElement;
  sections: NodeListOf<HTMLElement>;
  current = 0;
  scrollDelay = 600;

  private lastAnimationStartTime: number | null = null;

  constructor(opts: Options) {
    this.container = opts.container;
    this.sections = this.container.querySelectorAll('[data-page]');
    this.current = opts.defaultIndex ?? 0;

    for (let i = this.sections.length, j = 0; i > 0; i--, j++) {
      const element = this.sections[j];
      element.setAttribute('data-index', (j + 1).toString());
      element.style.transition = 'transform 1s cubic-bezier(0.550, 0.085, 0.000, 0.990)';
      element.style.zIndex = i.toString();
      element.style.position = 'absolute';
      element.addEventListener('wheel', this.onMouseWheel);
    }

    window.addEventListener('hashchange', this.toHashPos);
    this.toHashPos();
  }

  private toHashPos = () => {
    const hash = location.hash.replace(/^#/, '');
    const i = [...this.sections].findIndex((section) => section.dataset.author === hash);

    if (i === -1) return;
    this.to(i);
  }

  get isMoving() {
    if (!this.lastAnimationStartTime) return false;
    return Date.now() - this.lastAnimationStartTime <= 1000 + this.scrollDelay;
  }

  to(i: number): void {
    if (this.isMoving) return;
    const selectIndex = clamp(i, 0, this.sections.length - 1);

    for (let i = 0; i < selectIndex; i++) {
      this.setTransition(this.sections[i], '-100%');
    }

    for (let i = this.sections.length - 1; i >= selectIndex; i--) {
      this.setTransition(this.sections[i], '0');
    }
    
    this.current = selectIndex;
    this.lastAnimationStartTime = Date.now();
    
    const hash = this.sections[selectIndex].dataset.author;
    if (hash && hash !== '') location.hash = hash;
  }

  next(): void {
    console.log(this.current + 1);
    this.to(this.current + 1);
  }

  prev(): void {
    this.to(this.current - 1);
  }

  private setTransition = (node: HTMLElement, y: string = '0') => {
    node.style.transform = `translate3d(0, ${y}, 0)`;
  }

  private onMouseWheel = (ev: WheelEvent) => {
    const element = ev.target as HTMLDivElement;
    const { scrollHeight, clientHeight, scrollTop } = element;
    if (ev.deltaY > 0) {
      if (clientHeight + scrollTop >= scrollHeight) {
        this.next();
      }
    } else {
      if (scrollTop <= 0) {
        this.prev();
      }
    }
  }

  dispose(): void {
    this.container.remove();
    window.removeEventListener('hashchange', this.toHashPos);
    this.sections.forEach(node => node.removeEventListener('wheel', this.onMouseWheel));
  }
}