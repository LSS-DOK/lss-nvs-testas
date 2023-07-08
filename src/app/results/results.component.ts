import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss', '../app.component.scss']
})
export class ResultsComponent {
  public firstTryCounter: number = 0;
  public wrongCounter: number = 0;

  constructor(private router : Router) {
    let state = this.router.getCurrentNavigation()?.extras.state as { firstTryCounter : number, wrongCounter: number };

    if (state?.firstTryCounter === undefined || state?.wrongCounter === undefined) {
      router.navigateByUrl('/');
    }

    this.firstTryCounter = state.firstTryCounter;
    this.wrongCounter = state.wrongCounter;
  }

  ngOnInit() : void {
  }
}
