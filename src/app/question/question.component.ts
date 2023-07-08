import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService, IQuestion, IOption } from '../service/question.service';

export enum Mode {
  CLASSIC,
  REVERSE
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss', '../app.component.scss' ]
})
export class QuestionComponent {
  public get Mode() { return Mode; }

  public questionList : IQuestion[] = [];
  public currentQuestion: number = 0;

  public wrongCounter: number = 0;
  public firstTryCounter: number = 0;

  public disabledButtons: HTMLElement[] = [];

  private difficulty: number = 4;
  public mode : Mode = Mode.CLASSIC;

  constructor(private questionService: QuestionService, private router: Router) {
    let state = this.router.getCurrentNavigation()?.extras.state as { welcomeShown : boolean, difficulty: number, mode: Mode };

    console.log(state);

    if (state?.welcomeShown === undefined || !state.welcomeShown) {
      router.navigateByUrl('/');
    }

    this.difficulty = state.difficulty;
    this.mode = state.mode;
  }

  ngOnInit() : void {
    this.questionList = this.getAllQuestions();
  }

  getAllQuestions() : IQuestion[] {
    return this.questionService.getQuestions(this.difficulty);
  }

  answer(button: HTMLElement, questionNumber: number, opt : IOption) {
    if (this.disabledButtons.includes(button))
      return;

    if (opt.correct) {
      if (this.disabledButtons.length == 0) {
        ++this.firstTryCounter;
      } else {
        this.disabledButtons.length = 0;
      }
      ++this.currentQuestion;
      if (this.currentQuestion == this.questionList.length) {
        this.router.navigateByUrl('rezultatai/', { state: { firstTryCounter: this.firstTryCounter, wrongCounter: this.wrongCounter } });
      }
    } else {
      ++this.wrongCounter;
      this.disabledButtons.push(button);
    }
  }
}
