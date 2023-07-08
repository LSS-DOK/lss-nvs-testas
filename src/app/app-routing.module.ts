import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { ResultsComponent } from './results/results.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {'path':'sveiks/', component:WelcomeComponent},
  {'path':'klausimai/', component:QuestionComponent},
  {'path':'rezultatai/', component:ResultsComponent},
  {'path': '**', redirectTo:'sveiks/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
