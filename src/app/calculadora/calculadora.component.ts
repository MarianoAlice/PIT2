import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})

export class CalculadoraComponent implements OnInit {  
  tempoContribuicao: number = 0;
  entrouAntes:       string = '';
  sexo:              string = '';
  categoria:         string = '';
  nascimentoAtual:   any;
  mostrar_tabela: boolean = false;

  //Bloco de mensagens
  mensagemRegraGeral:                 string = '';
  mensagemPontos:                     string = '';
  mensagemTempoMinimoIdadeMinima:     string = '';
  mensagemFatorPrevidenciarioPedagio: string = '';
  mensagemIdadeMinimaPedagioCompleto: string = '';

  //Bloco de constantes
  idadeMinimaMulher:                   Number = 62;
  idadeMinimaHomem:                    Number = 65;
  contribuicaoMinimaMulher:            Number = 15;
  contribuicaoMinimaHomemEntrouAntes:  Number = 15;
  contribuicaoMinimaHomemEntrouDepois: Number = 20;
  idadeMinimaProfessora:               Number = 57;
  idadeMinimaProfessor:                Number = 60;
  contribuicaoMinimaProfessores:       Number = 25;
  idadeMinimaPolicias:                 Number = 55;
  contribuicaoMinimaPoliciais:         Number = 25;
  contribuicaoParaTetoMulher:          Number = 35;
  contribuicaoParaTetoHomem:           Number = 40;

  // @Output() onSubmit = new EventEmitter()

  constructor(){

  }
  
  calcular(): void {
    this.mensagemRegraGeral = this.regraGeral().mensagemRegraGeral;
    this.mensagemPontos = this.transicaoPontos().mensagemPontos;
    this.mensagemTempoMinimoIdadeMinima = this.regraTempoMinimoIdadeMinima().mensagemTempoMinimoIdadeMinima
    this.mensagemFatorPrevidenciarioPedagio = this.regraFatorPrevidenciarioPedagio().mensagemFatorPrevidenciarioPedagio
    this.mensagemIdadeMinimaPedagioCompleto = this.regraIdadeMinimaPedagioCompleto().mensagemIdadeMinimaPedagioCompleto
    this.mostrar_tabela = true;
  }

  verIdade(){
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
    let tempoTotal =     Number(this.tempoContribuicao)
    let idadeCalculo =   Number(this.verIdade().idade)
    var idadeMinCalculo: Number = 0;
    var tempoCalculo:    Number = 0;

    if (this.sexo === 'feminino' && this.categoria==='nenhum'){
      idadeMinCalculo = this.idadeMinimaMulher;
      tempoCalculo = this.contribuicaoMinimaMulher;
    } else if (this.sexo === 'feminino' && this.categoria==='professor'){
      idadeMinCalculo = this.idadeMinimaProfessora;
      tempoCalculo = this.contribuicaoMinimaProfessores;
    } else if (this.sexo === 'masculino' && this.categoria==='nenhum'){
      idadeMinCalculo = this.idadeMinimaHomem;
      if (this.entrouAntes === 'sim'){
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
    
    if(tempoFaltaContribuir <= 0 && idadeMinima <= 0){
      var mensagemRegraGeral = "Já atingiu os requisitos para aposentar pela regra geral."
    } else {
      var tempoTexto: string = "";
      var idadeTexto: string = "";
      if(tempoFaltaContribuir > 0){
        tempoTexto = "Ainda falta contribuir por "+tempoFaltaContribuir+ " ano(s)."
      } else {
        tempoTexto = "Você já atingiu o tempo mínimo de contribuição."
      }
      if (idadeMinima > 0){
        idadeTexto = "Daqui a "+idadeMinima+ " ano(s) você atingirá a idade mínima."
      }
      var mensagemRegraGeral = tempoTexto+" "+idadeTexto
    }
   return {mensagemRegraGeral:mensagemRegraGeral}
  }

  transicaoPontos(){
    let tempoTotal = Number(this.tempoContribuicao)
    let idadeCalculo = Number(this.verIdade().idade)
    let dataAtual = new Date();
    let anoAjustado = Number(moment(dataAtual).format('YYYY'))
    if (this.sexo === 'feminino'){
      var pontosValidos = this.tabela(anoAjustado).pontosMulher
    } else {
      var pontosValidos = this.tabela(anoAjustado).pontosHomem
    }
    if((tempoTotal+idadeCalculo)>pontosValidos){
      var mensagemPontos = "Atingiu pontos!"
    } else {
      var pontosFaltantes = pontosValidos - (tempoTotal+idadeCalculo)
      var tempoFaltante = pontosFaltantes/2
      var mensagemPontos = "Ainda faltam " +pontosFaltantes+" pontos. Caso continue contribuindo a expectativa é de se aposentar em "+tempoFaltante+" ano(s) por esta regra!"
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

  regraTempoMinimoIdadeMinima() {
    const tempoCalculo =       Number(this.tempoContribuicao)
    let dataAtual =            moment();
    let AnoAtual =             Number(moment(dataAtual).format('YYYY'));
    let diaMesNascimento =     moment(this.nascimentoAtual).format('MM-DD')
    let aniversarioAnoAtual =  diaMesNascimento+"-"+AnoAtual
    let dataAniversarioAtual = moment(aniversarioAnoAtual)
    let mesIdade =             dataAtual.diff(dataAniversarioAtual, 'month');
    let tempoFaltante:         number = 0;
    let idadeFaltante:         number = 0;
    let mesFaltante:           number = 0;
    const idadeCalculo =       Number(this.verIdade().idade)
    var idadeMinCalculo:       number = 0;
    var tempoMinCalculo:       number = 0;
    var mesCalculo:            number = 0;
    var mensagemTempoMinimoIdadeMinima: string = '';

    if (this.sexo === 'feminino'){
      if(this.categoria==='professor') {
        tempoMinCalculo = 30;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoProfessora;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesMulher;
      } else {
        tempoMinCalculo = 30;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoMulher;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesMulher;
      }
    } else if (this.sexo === 'masculino'){
      if(this.categoria==='professor') {
        tempoMinCalculo = 35;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoProfessor;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesHomem;
      } else {
        tempoMinCalculo = 35;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoHomem;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesHomem;
      }
    }

    if (tempoMinCalculo > tempoCalculo){
      tempoFaltante = tempoMinCalculo - tempoCalculo;
    } else {
      tempoFaltante = 0;
    }
    if (idadeMinCalculo > idadeCalculo) {
      idadeFaltante = idadeMinCalculo - idadeCalculo;
      mensagemTempoMinimoIdadeMinima = "Tempo para aposentadoria pela regra da idade mínima ainda não foi atendido. Você poderá se aposentar quando cumprir "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) e "+mesCalculo+" meses de idade. Faltam "+idadeFaltante+" ano(s).";
    } else if (idadeMinCalculo == idadeCalculo) {
      idadeFaltante = 0;
      if (mesCalculo > mesIdade) {
        mesFaltante = mesCalculo - mesIdade;
        mensagemTempoMinimoIdadeMinima = "Tempo para aposentadoria pela regra da idade mínima ainda não foi atendido. Você poderá se aposentar quando cumprir "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) e "+mesCalculo+" meses de idade. Faltam "+mesFaltante+" meses.";
      } else {
        mesFaltante = 0;
        mensagemTempoMinimoIdadeMinima = "Tempo para aposentadoria pela regra da idade mínima ATINGIDO. Você já cumpriu "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) e "+mesCalculo+" meses de idade.";
      }
    } else if (idadeMinCalculo < idadeCalculo){
      idadeFaltante = 0;
      mesFaltante = 0;
      mensagemTempoMinimoIdadeMinima = "Tempo para aposentadoria pela regra da idade mínima ATINGIDO. Você já cumpriu "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) e "+mesCalculo+" meses de idade.";
    }

  return{mensagemTempoMinimoIdadeMinima: mensagemTempoMinimoIdadeMinima}
}

idadeAjustadaComMeses(AnoAtual: number){

    var anoMulher:     number = 0;
    var anoHomem:      number = 0;
    var anoProfessora: number = 0;
    var anoProfessor:  number = 0;
    var mesMulher:     number = 0;
    var mesHomem:      number = 0;
    
    if (AnoAtual >= 2029){
      anoMulher = 62
      anoHomem = 65
      anoProfessora = 57
      anoProfessor = 60
      mesMulher = 0
      mesHomem = 0
    }else if (AnoAtual == 2030){
      anoMulher = 61
      anoHomem = 65
      anoProfessora = 56
      anoProfessor = 60
      mesMulher = 6
      mesHomem = 6
    }else if (AnoAtual == 2029){
      anoMulher = 61
      anoHomem = 65
      anoProfessora = 56
      anoProfessor = 60
      mesMulher = 0
      mesHomem = 0
    }else if (AnoAtual == 2028){
      anoMulher = 60
      anoHomem = 65
      anoProfessora = 55
      anoProfessor = 60
      mesMulher = 6
      mesHomem = 6
    }else if (AnoAtual == 2027){
      anoMulher = 60
      anoHomem = 65
      anoProfessora = 55
      anoProfessor = 60
      mesMulher = 0
      mesHomem = 0
    }else if (AnoAtual == 2026){
      anoMulher = 59
      anoHomem = 64
      anoProfessora = 54
      anoProfessor = 59
      mesMulher = 6
      mesHomem = 6
    }else if (AnoAtual == 2025){
      anoMulher = 59
      anoHomem = 64
      anoProfessora = 54
      anoProfessor = 59
      mesMulher = 0
      mesHomem = 0
    }else if (AnoAtual == 2024){
      anoMulher = 58
      anoHomem = 63
      anoProfessora = 53
      anoProfessor = 58
      mesMulher = 6
      mesHomem = 6
    }else if (AnoAtual == 2023){
      anoMulher = 58
      anoHomem = 63
      anoProfessora = 53
      anoProfessor = 58
      mesMulher = 0
      mesHomem = 0
    }else if (AnoAtual == 2022){
      anoMulher = 57
      anoHomem = 62
      anoProfessora = 52
      anoProfessor = 57
      mesMulher = 6
      mesHomem = 6
    }else if (AnoAtual == 2021){
      anoMulher = 57
      anoHomem = 62
      anoProfessora = 52
      anoProfessor = 57
      mesMulher = 0
      mesHomem = 0
    }else if (AnoAtual == 2020){
      anoMulher = 56
      anoHomem = 61
      anoProfessora = 51
      anoProfessor = 56
      mesMulher = 6
      mesHomem = 6
    }else if (AnoAtual <= 2019){
      anoMulher = 56
      anoHomem = 61
      anoProfessora = 51
      anoProfessor = 56
      mesMulher = 0
      mesHomem = 0
    }
    return {anoMulher: anoMulher, anoHomem: anoHomem, anoProfessora: anoProfessora, anoProfessor: anoProfessor , mesMulher:mesMulher, mesHomem: mesHomem}
  }

  regraFatorPrevidenciarioPedagio(){
    const tempoCalculo = Number(this.tempoContribuicao);
    let tempoMinCalculo: number = 0;
    let tempoPegadio:    number = 0;
    let tempoDiferenca:  number = 0;
    let pedagio =        1;
    let novoTempo:       number = 0;
    let tempoAjustado:   number = 0;
    let mensagemFatorPrevidenciarioPedagio: string = '';

    if (this.sexo === 'feminino'){
      tempoMinCalculo = 30;
      tempoPegadio = 28;
      tempoDiferenca = tempoPegadio - tempoCalculo;
    } else if (this.sexo === 'masculino'){
      tempoMinCalculo = 35;
      tempoPegadio = 33;
      tempoDiferenca = tempoPegadio - tempoCalculo;
    }

    if (tempoCalculo >= tempoPegadio){
      novoTempo = tempoMinCalculo + pedagio;
      tempoAjustado = novoTempo - tempoCalculo;
      if(tempoCalculo >= novoTempo){
        mensagemFatorPrevidenciarioPedagio = "Você ATINGIU a regra de transição com fator previdenciário ao cumprir "+novoTempo+" ano(s) de contribuição.";
      } else{
        mensagemFatorPrevidenciarioPedagio = "Você atingirá a regra de transição com fator previdenciário em "+tempoAjustado+" ano(s). Ao cumprir "+novoTempo+" ano(s) a mais do tempo mínimo de contribuição ("+tempoMinCalculo+").";
      }
    } else {
      mensagemFatorPrevidenciarioPedagio = "A regra de pedágio não se aplica à sua situação!"
    }
  return{mensagemFatorPrevidenciarioPedagio: mensagemFatorPrevidenciarioPedagio}
  }

  regraIdadeMinimaPedagioCompleto(){
    const idadeCalculo =       Number(this.verIdade().idade)
    const tempoCalculo = Number(this.tempoContribuicao);
    let tempoMinCalculo: number = 0;
    let idadeMinCalculo: number = 0;
    let diferencaIdade: number = 0;
    let pedagio: number = 0;
    let tempoAjustado: number = 0;
    let tempoFaltante: number = 0;
    let mensagemIdadeMinimaPedagioCompleto: string = '';

    if (this.sexo === 'feminino'){
      if(this.categoria==='professor') {
        tempoMinCalculo = 25;
        idadeMinCalculo = 52;
      } else {
        tempoMinCalculo = 30;
        idadeMinCalculo = 57;
      }
    } else if (this.sexo === 'masculino'){
      if(this.categoria==='professor') {
        tempoMinCalculo = 30;
        idadeMinCalculo = 55;
      } else {
        tempoMinCalculo = 35;
        idadeMinCalculo = 60;
      }
    }
    
    pedagio = tempoMinCalculo - tempoCalculo
    tempoAjustado = tempoMinCalculo + pedagio;
    tempoFaltante = tempoAjustado - tempoCalculo;

    if (idadeCalculo >= idadeMinCalculo){
      if(tempoFaltante <= 0){
        mensagemIdadeMinimaPedagioCompleto = "Você atingiu a regra de idade mínima com 100% de pedágio ao cumprir "+tempoAjustado+" ano(s) de contribbuição e "+idadeMinCalculo+" ano(s) de idade."
      } else {
        mensagemIdadeMinimaPedagioCompleto = "Você já atingiu a idade mínima de "+idadeMinCalculo+" ano(s). Faltam "+tempoFaltante+" ano(s) de contribuição para cumprir os "+tempoAjustado+" ano(s) referentes ao pedágio de 100%."
      }
    } else {
      diferencaIdade = idadeMinCalculo - idadeCalculo;
      mensagemIdadeMinimaPedagioCompleto = "Você ainda não atingiu a idade mínima de "+idadeMinCalculo+" ano(s). Dentro de "+diferencaIdade+" ano(s) e após cumprir "+tempoAjustado+" ano(s) de contribuição você terá cumprido a idade mínima e o pedágio de 100%."
    }

  return{mensagemIdadeMinimaPedagioCompleto: mensagemIdadeMinimaPedagioCompleto}
  }
  
    
    
    ngOnInit(): void {
    
    }
}