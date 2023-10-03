import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
  // providers: [DatePipe]
})

export class CalculadoraComponent implements OnInit {  
  datePipe: DatePipe = new DatePipe('en-US');
  tempoContribuiAntesInformado: string = '';
  tempoContribuiAposInformado:  string = '';
  sexo:                         string = '';
  nascimentoAtual:              any;

  //Bloco de constantes
  idadeMinimaMulher: Number = 62;
  idadeMinimaHomem: Number = 65;
  contribuicaoMinimaMulher: Number = 15;
  contribuicaoMinimaHomemEntrouAntes: Number = 15;
  contribuicaoMinimaHomemEntrouDepois: Number = 20;
  idadeMinimaProfessora: Number = 57;
  idadeMinimaProfessor: Number = 60;
  contribuicaoMinimaProfessores: Number = 25;
  idadeMinimaPolicias: Number = 55;
  contribuicaoMinimaPoliciais: Number = 25;

  getAno(dataInformada: Date){
    var date = new Date(dataInformada);
    var transformDate = this.datePipe.transform(date, 'yyyy');
    return transformDate;
  }




  // @Output() onSubmit = new EventEmitter()

  constructor(){

  }
  
  calcular(): void {
    console.log("testando...", this.nascimentoAtual)
    console.log("testando recupera ano...", this.getAno(this.nascimentoAtual))
    
    console.log("testando...", this.sexo)
    console.log("tempoContribuiAposInformado: ", this.tempoContribuiAposInformado);
    console.log("tempoContribuiAntesInformado: ", this.tempoContribuiAntesInformado);
    alert("Calculando...")
    
  }


  tabela(nrAno: number){
    var pontosMulher: number = 0;
    var pontosHomem: number = 0;
    
    if (nrAno >= 2033){
      pontosHomem = 105
      pontosMulher = 100
    } else if (nrAno == 2032){
      pontosHomem = 105
      pontosMulher = 99
    } else if (nrAno == 2031){
      pontosHomem = 105
      pontosMulher = 98
    } else if (nrAno == 2030){
      pontosHomem = 105
      pontosMulher = 97
    } else if (nrAno == 2029){
      pontosHomem = 105
      pontosMulher = 96
    } else if (nrAno == 2028){
      pontosHomem = 105
      pontosMulher = 95
    } else if (nrAno == 2027){
      pontosHomem = 104
      pontosMulher = 94
    } else if (nrAno == 2026){
      pontosHomem = 103
      pontosMulher = 93
    } else if (nrAno == 2025){
      pontosHomem = 102
      pontosMulher = 92
    } else if (nrAno == 2024){
      pontosHomem = 101
      pontosMulher = 91
    } else if (nrAno == 2023){
      pontosHomem = 100
      pontosMulher = 90
    } else if (nrAno == 2022){
      pontosHomem = 99
      pontosMulher = 89
    } else if (nrAno == 2021){
      pontosHomem = 98
      pontosMulher = 88
    } else if (nrAno == 2020){
      pontosHomem = 97
      pontosMulher = 87
    } else if (nrAno <= 2019){
      pontosHomem = 96
      pontosMulher = 86
    };
    return { pontosHomem:pontosHomem, pontosMulher:pontosMulher };
  };

  selecionaData(){
    console.log("sexo: ", this.sexo);
    console.log("nascimentoAtual:  ", this.nascimentoAtual)
  }
  // method to get formatted date
    getFormattedDate(){
      var date = new Date();
      var transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');
      return transformDate;
    }

    
    
    ngOnInit(): void {
      
    }
}