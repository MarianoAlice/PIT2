import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ContatoComponent } from './contato/contato.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InformacaoComponent } from './informacao/informacao.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculadoraComponent,
    ContatoComponent,
    NavBarComponent,
    InformacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
