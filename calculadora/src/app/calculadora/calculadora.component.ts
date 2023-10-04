import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
  // providers: [DatePipe]
})

export class CalculadoraComponent implements OnInit {  
  datePipe: DatePipe = new DatePipe('en-US');
  tempoContribuiAntesInformado: number = 0;
  tempoContribuiAposInformado:  number = 0;
  sexo:                         string = '';
  categoria:                    string = '';
  nascimentoAtual:              any;
  // idade:                        Number = 0;
  // dataIdade56:                  any;
  // dataIdade57:                  any;
  // dataIdade60:                  any;
  // dataIdade62:                  any;
  // dataIdade65:                  any;
  

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
    let date = new Date(dataInformada);
    let transformDate = this.datePipe.transform(date, 'yyyy');
    return transformDate;
  }

  // @Output() onSubmit = new EventEmitter()

  constructor(){

  }
  
  calcular(): void {
    // console.log("testando data de nascimento...", this.nascimentoAtual)
    // console.log("testando recupera ano...", this.getAno(this.nascimentoAtual))
    // let anoAjustado = Number(this.getAno(this.nascimentoAtual))
    // console.log("testando tabela de pontos...", this.tabela(anoAjustado))
    // console.log("testando tabela de pontos...", this.tabela(anoAjustado).pontosHomem)
    // console.log("testando idade...", this.verIdade())
    
    // console.log("testando...", this.sexo)
    // console.log("tempoContribuiAposInformado: ", this.tempoContribuiAposInformado);
    // console.log("tempoContribuiAntesInformado: ", this.tempoContribuiAntesInformado);
    console.log("testando regra geral: ", this.regraGeral().mensagemRegraGeral);
    console.log("testando função de pontos: ", this.transicaoPontos().mensagemPontos);
    
    
    alert("Calculando...")
    
  }

  verIdade(){
    console.log("dataNascimento em ver idade: ", this.nascimentoAtual);
    var dataAtual = moment();
    var dataIdade55: any;
    var dataIdade57: any;
    var dataIdade60: any;
    var dataIdade62: any;
    var dataIdade65: any;
    if (this.nascimentoAtual !== null){
      idade = dataAtual.diff(this.nascimentoAtual, 'years');
      dataIdade55 = moment(this.nascimentoAtual).add(55, 'years');
      dataIdade57 = moment(this.nascimentoAtual).add(57, 'years');
      dataIdade60 = moment(this.nascimentoAtual).add(60, 'years');
      dataIdade62 = moment(this.nascimentoAtual).add(62, 'years');
      dataIdade65 = moment(this.nascimentoAtual).add(65, 'years');
    } else {
      var idade: Number = 0;
    }
    return { idade:idade, 
            dataIdade55:dataIdade55, 
            dataIdade57:dataIdade57, 
            dataIdade60:dataIdade60,
            dataIdade62:dataIdade62, 
            dataIdade65:dataIdade65
           };
  };

  regraGeral(){
    let tempoTotal =     Number(this.tempoContribuiAntesInformado) + Number(this.tempoContribuiAposInformado)
    let idadeCalculo =   Number(this.verIdade().idade)
    var idadeMinCalculo: Number = 0;
    var tempoCalculo:    Number = 0;
    console.log("this.sexo: ", this.sexo);
    console.log("this.categoria: ", this.categoria);

    if (this.sexo === 'feminino' && this.categoria==='nenhum'){
      idadeMinCalculo = this.idadeMinimaMulher;
      tempoCalculo = this.contribuicaoMinimaMulher;
    } else if (this.sexo === 'feminino' && this.categoria==='professor'){
      idadeMinCalculo = this.idadeMinimaProfessora;
      tempoCalculo = this.contribuicaoMinimaProfessores;
    } else if (this.sexo === 'masculino' && this.categoria==='nenhum'){
      idadeMinCalculo = this.idadeMinimaHomem;
      if (this.tempoContribuiAntesInformado === 0){
        tempoCalculo = this.contribuicaoMinimaHomemEntrouAntes  
      } else {
        tempoCalculo = this.contribuicaoMinimaHomemEntrouDepois;
      }
    } else if (this.sexo === 'masculino' && this.categoria==='professor'){
      idadeMinCalculo = this.idadeMinimaProfessor;
      tempoCalculo = this.contribuicaoMinimaProfessores;
    } else if (this.categoria==='policial'){
      idadeMinCalculo = this.idadeMinimaPolicias;
      tempoCalculo = this.contribuicaoMinimaPoliciais;
    }

    var tempoFaltaContribuir = Number(tempoCalculo) - Number(tempoTotal)
    var idadeMinima = Number(idadeMinCalculo) - Number(idadeCalculo)
    console.log("tempoCalculo: ", tempoCalculo);
    console.log("tempoTotal: ", tempoTotal);
    console.log("idadeMinCalculo: ", idadeMinCalculo);
    console.log("idadeCalculo: ", idadeCalculo);
    console.log("tempoFaltaContribuir: ", tempoFaltaContribuir);
    console.log("idadeMinima: ", idadeMinima);

    if(tempoFaltaContribuir <= 0 && idadeMinima <= 0){
      var mensagemRegraGeral = "Já atingiu os requisitos para aposentar pela regra geral."
    } else {
      var tempoTexto: string = "";
      var idadeTexto: string = "";
      if(tempoFaltaContribuir > 0){
        tempoTexto = "Ainda falta contribuir por "+tempoFaltaContribuir+ " ano(s)."
      }
      if (idadeMinima > 0){
        idadeTexto = "Daqui a "+idadeMinima+ " ano(s) você atingirá a idade mínima."
      }
      var mensagemRegraGeral = tempoTexto+" <br/>"+idadeTexto
    }
   return {mensagemRegraGeral:mensagemRegraGeral}
  }

  transicaoPontos(){
    let tempoTotal = Number(this.tempoContribuiAntesInformado) + Number(this.tempoContribuiAposInformado)
    console.log("tempoTotal: ", tempoTotal);
    let idadeCalculo = Number(this.verIdade().idade)
    console.log("idadeCalculo: ", idadeCalculo);
    let dataAtual = new Date();
    let anoAjustado = Number(this.getAno(dataAtual))
    if (this.sexo === 'Feminino'){
      var pontosValidos = this.tabela(anoAjustado).pontosMulher
    } else {
      var pontosValidos = this.tabela(anoAjustado).pontosHomem
    }
    if((tempoTotal+idadeCalculo)>pontosValidos){
      var mensagemPontos = "Atingiu pontos!"
    } else {
      var pontosFaltantes = pontosValidos - (tempoTotal+idadeCalculo)
      var tempoFaltante = pontosFaltantes/2
      var mensagemPontos = "AInda faltam " +pontosFaltantes+ "pontos. Caso continue contribuindo a expectativa é de se aposentar em "+tempoFaltante+" anos por esta regra!"
    }
    return { mensagemPontos:mensagemPontos}
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

  // selecionaData(){
  //   console.log("sexo: ", this.sexo);
  //   console.log("nascimentoAtual:  ", this.nascimentoAtual)
  // }

    
    
    ngOnInit(): void {
      // let pessoa : object;
      // pessoa = {
      //   idade: Number,
      //   dataIdade56: Date,
      //   dataIdade57: Date,
      //   dataIdade60: Date,
      //   dataIdade62: Date,
      //   dataIdade65: Date
      // };
    }
}