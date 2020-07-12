export default class TypeWriter {
  private htmlElement: HTMLElement | null;
  private delay: number;
  private words: string[];
  private erase: Boolean = false;
  private word: string = '';
  private countChar: number = 0;
  private countWord: number = 0;

  constructor(span: HTMLSpanElement, words: string[] | string, colorBlink: string, delay: number = 1000) {
    this.htmlElement = span;
    this.delay = delay;
    this.castString(words);
    this.start();
    this.createBlink(colorBlink);

  }


  private castString(words: string[] | string) {
    if (typeof words === 'string') {
      this.words = words.split(' ');
    } else {
      this.words = words;
    }
  }


  private flagErase(): boolean {
    if (this.countChar === 0) return this.erase = false;
    if (this.countChar === this.words[this.countWord].length) return this.erase = true;
  }


  private action() {
    let tempo: number;
    if (!this.erase) {
      tempo = this.delay / 3;
      this.word = this.words[this.countWord].substring(0, this.countChar++);
    } else {
      (this.countChar === this.words[this.countWord].length) ?
        tempo = this.delay :
        tempo = this.delay / 7;
      this.word = this.words[this.countWord].substring(0, this.countChar--);
    }
    return tempo;

  }


  private changeCharWord() {
    if (this.countChar === 0) this.countWord++;
    if (this.countWord === this.words.length) this.countWord = 0;

  }


  private createBlink(colorBlink: string) {
    let blink: HTMLDivElement = document.createElement('div');
    blink.className = 'blink';
    blink.style.display = 'inline-block';
    blink.style.height = '1.1em';
    blink.style.width = '9px';
    blink.style.background = colorBlink;
    blink.style.zIndex = '0';
    blink.style.animation = 'blink 220ms ease-in-out infinite alternate';

    this.htmlElement.parentElement.appendChild(blink);

  }


  private start() {

    this.flagErase();
    let tempo = this.action();
    this.changeCharWord();
    this.htmlElement.textContent = `${this.word}`;

    setTimeout(() => this.start(), tempo);
  }
}

