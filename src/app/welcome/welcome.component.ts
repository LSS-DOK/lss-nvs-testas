import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NUM_QUESTIONS, QuestionService } from '../service/question.service';
import { Mode } from '../question/question.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss', '../app.component.scss']
})
export class WelcomeComponent {
  public get MAX_DIFFICULTY() : number { return NUM_QUESTIONS; }

  difficulty : number = 12;

  public get Mode() {
    return Mode;
  }

  public mode : Mode = Mode.REVERSE;

  constructor(private router: Router) {}

  ngOnInit() : void {
    this.difficulty = Number.parseInt(localStorage.getItem('difficulty') || '4');
    let m = localStorage.getItem('mode') || 'classic';
    this.mode = m == 'classic' ? Mode.CLASSIC : Mode.REVERSE;
  }
  go() {
    localStorage.setItem('difficulty', Math.min(Math.max(this.difficulty, 1), this.MAX_DIFFICULTY).toString());
    localStorage.setItem('mode', this.mode == Mode.CLASSIC ? 'classic' : 'reverse');
    this.router.navigateByUrl('klausimai/', { state: { welcomeShown: true, mode: this.mode, difficulty: this.difficulty }});
  }
}
