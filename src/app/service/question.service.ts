import { Injectable } from '@angular/core';

const QUESTIONS = [
  { img: 'assets/img/1.png',  title: 'Supratau' },
  { img: 'assets/img/2.png',  title: 'Nesupratau' },
  { img: 'assets/img/3.png',  title: 'Nejudėk' },
  { img: 'assets/img/4.png',  title: 'Gulk arba pritūpk' },
  { img: 'assets/img/5.png',  title: 'Matau priešą' },
  { img: 'assets/img/6.png',  title: 'Pavojinga zona' },
  { img: 'assets/img/7.png',  title: 'Staigi pasala' },
  { img: 'assets/img/8.png',  title: 'Kliūtis arba sankryža' },
  { img: 'assets/img/9.png',  title: 'Pleištu' },
  { img: 'assets/img/10.png', title: 'Grandine' },
  { img: 'assets/img/11.png', title: 'Išsidėstyti žiedu' },
  { img: 'assets/img/12.png', title: 'Vora po vieną' },
  { img: 'assets/img/13.png', title: 'Pasitikslink žemėlapyje' },
  { img: 'assets/img/14.png', title: 'Skaičiuok žingsnius' },
  { img: 'assets/img/15.png', title: 'Suskaičiuok karius' },
  { img: 'assets/img/16a.png', title: 'Stebėk / atkreipk dėmesį' },
  { img: 'assets/img/17.png', title: 'Pasitaisyk maskuotę' },
  { img: 'assets/img/18.png', title: 'Vora po du' },
  { img: 'assets/img/19.png', title: 'Sumažink atstumą' },
  { img: 'assets/img/20.png', title: 'Padidink atstumą' },
  { img: 'assets/img/21.png', title: 'Greičiau' },
  { img: 'assets/img/22.png', title: 'Lėčiau' },
  { img: 'assets/img/23.png', title: 'Pas mane' },
  { img: 'assets/img/24.png', title: 'Skyrininkas' },
  { img: 'assets/img/25.png', title: 'Būrio vado pavaduotojas' },
  { img: 'assets/img/26.png', title: 'Būrio vadas' },
  { img: 'assets/img/27.png', title: 'Ryšininkas' },
];

export const NUM_QUESTIONS : number = QUESTIONS.length;

export interface IOption {
  title: string;
  img: string;
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

  getQuestions(numOptions: number) : IQuestion[] {
    numOptions = Math.max(1, Math.min(numOptions, QUESTIONS.length));

    let me = this;
    let q : IQuestion[] = [];

    QUESTIONS.forEach(function(r) {
      let optionsSet = new Set<{title: string, img: string}>();

      optionsSet.add(r);
      while (optionsSet.size < numOptions)
        optionsSet.add(QUESTIONS[me.randInt(QUESTIONS.length)]);

      q.push({ title: r.title, img: r.img, options: me.shuffle([...optionsSet!].map(x => ({ title: x.title, img: x.img, ...(x.title===r.title && { correct: true } )}))) });
    });

    return this.shuffle(q);
  }
}
