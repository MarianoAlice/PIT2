import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ContatoComponent } from './contato/contato.component';
import { InformacaoComponent } from './informacao/informacao.component';

const routes: Routes = [
  { path: '', redirectTo: 'calculadora', pathMatch: 'full'},
  { path: 'calculadora', component: CalculadoraComponent, pathMatch: 'full'},
  { path: 'contato', component: ContatoComponent},
  { path: 'informacao', component: InformacaoComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
