import { Injectable } from '@angular/core';

const QUESTIONS = [
  { cat: 'a', img: 'assets/img/1.png',  title: 'Supratau' },
  { cat: 'a', img: 'assets/img/2.png',  title: 'Nesupratau' },
  { cat: 'a', img: 'assets/img/3.png',  title: 'Nejudėk' },
  { cat: 'a', img: 'assets/img/4.png',  title: 'Gulk arba pritūpk' },
  { cat: 'a', img: 'assets/img/5.png',  title: 'Matau priešą' },
  { cat: 'a', img: 'assets/img/6.png',  title: 'Pavojinga zona' },
  { cat: 'a', img: 'assets/img/7.png',  title: 'Staigi pasala' },
  { cat: 'a', img: 'assets/img/8.png',  title: 'Kliūtis arba sankryža' },
  { cat: 'a', img: 'assets/img/9.png',  title: 'Pleištu' },
  { cat: 'a', img: 'assets/img/10.png', title: 'Grandine' },
  { cat: 'a', img: 'assets/img/11.png', title: 'Išsidėstyti žiedu' },
  { cat: 'a', img: 'assets/img/12.png', title: 'Vora po vieną' },
  { cat: 'c', img: 'assets/img/13.png', title: 'Pasitikslink žemėlapyje' },
  { cat: 'c', img: 'assets/img/14.png', title: 'Skaičiuok žingsnius' },
  { cat: 'c', img: 'assets/img/15.png', title: 'Suskaičiuok karius' },
  { cat: 'c', img: 'assets/img/16a.png', title: 'Stebėk / atkreipk dėmesį' },
  { cat: 'a', img: 'assets/img/17.png', title: 'Pasitaisyk maskuotę' },
  { cat: 'a', img: 'assets/img/18.png', title: 'Vora po du' },
  { cat: 'a', img: 'assets/img/19.png', title: 'Sumažink atstumą' },
  { cat: 'a', img: 'assets/img/20.png', title: 'Padidink atstumą' },
  { cat: 'a', img: 'assets/img/21.png', title: 'Greičiau' },
  { cat: 'a', img: 'assets/img/22.png', title: 'Lėčiau' },
  { cat: 'a', img: 'assets/img/23.png', title: 'Pas mane' },
  { cat: 'b', img: 'assets/img/24.png', title: 'Skyrininkas' },
  { cat: 'b', img: 'assets/img/25.png', title: 'Būrio vado pavaduotojas' },
  { cat: 'b', img: 'assets/img/26.png', title: 'Būrio vadas' },
  { cat: 'b', img: 'assets/img/27.png', title: 'Ryšininkas' },
];

const FAKE_OPTIONS = [
  { cat: 'c', title: 'Užsirišk batus' },
];

export enum Mode {
  CLASSIC,
  REVERSE
}

export const NUM_QUESTIONS : number = QUESTIONS.length;

export interface IOption {
  title: string;
  img?: string;
  correct?: boolean;
}

export interface IQuestion {
  title: string;
  img: string;
  options: IOption[];
}

@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  constructor() { }

  private randInt(max: number) : number {
    return Math.floor(Math.random() * max);
  }

  private shuffle<T>(array: T[]) : T[] {
    let currentIndex = array.length;

    while (currentIndex > 0) {
      let randomIndex = this.randInt(currentIndex);
      --currentIndex;

      [array[randomIndex], array[currentIndex]] = [array[currentIndex], array[randomIndex]];
    }

    return array;
  }

  getQuestions(numOptions: number, mode: Mode) : IQuestion[] {
    let total = QUESTIONS.length;
    if (mode === Mode.CLASSIC)
      total += FAKE_OPTIONS.length;
    numOptions = Math.max(1, Math.min(numOptions, total));

    let me = this;
    let q : IQuestion[] = [];

    QUESTIONS.forEach(function(r) {
      let optionsSet = new Set<{title: string, cat?: string, img?: string}>();

      optionsSet.add(r);

      let cat = [ ...QUESTIONS.filter(x => x.cat === r.cat), ...(FAKE_OPTIONS.filter(x => x.cat === r.cat)) ];

      while (optionsSet.size < numOptions && cat.length > 0) {
        let i = me.randInt(cat.length);
        if (mode === Mode.CLASSIC || (mode === Mode.REVERSE && 'img' in cat[i]))
          optionsSet.add(cat[i]);
        cat.splice(i, 1);
      }

      while (optionsSet.size < numOptions)
        optionsSet.add(QUESTIONS[me.randInt(QUESTIONS.length)]);

      q.push({ title: r.title, img: r.img!, options: me.shuffle([...optionsSet!].map(x => ({ title: x.title, img: x.img, ...(x.title===r.title && { correct: true } )}))) });
    });

    return this.shuffle(q);
  }
}
