import { LOCALE_ID, NgModule } from '@angular/core';
import localePT from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ContatoComponent } from './contato/contato.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InformacaoComponent } from './informacao/informacao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(localePT);

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

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
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt-br'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
