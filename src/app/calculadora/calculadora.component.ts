import { Component, OnInit, Input } from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})


export class CalculadoraComponent implements OnInit {  
  tempoContribuicao: any;
  entrouAntes:       any;
  sexo:              any;
  categoria:         any;
  nascimentoAtual:   any;
  mostrar_tabela:    boolean = false;
  hoje  = moment();
  minDate = moment(this.hoje).add(-100, 'years');
  maxDate = moment(this.hoje).add(-18, 'years');

  formCalcula = new FormGroup({
    tempoContribuicao: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0), Validators.max(60)]),
    entrouAntes:       new FormControl('', [Validators.required]),
    sexo:              new FormControl('', [Validators.required]),
    categoria:         new FormControl('', [Validators.required]),
    nascimentoAtual:   new FormControl(null, [Validators.required])
  });

  //Bloco de mensagens
  mensagemRegraGeral:                 string = '';
  mensagemPontos:                     string = '';
  mensagemTempoMinimoIdadeMinima:     string = '';
  mensagemFatorPrevidenciarioPedagio: string = '';
  mensagemIdadeMinimaPedagioCompleto: string = '';
  mensagemDetalheRegraGeral:                 string = '';
  mensagemDetalhePontos:                     string = '';
  mensagemDetalheTempoMinimoIdadeMinima:     string = '';
  mensagemDetalheFatorPrevidenciarioPedagio: string = '';
  mensagemDetalheIdadeMinimaPedagioCompleto: string = '';

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

  
  calcular(): void {
    if(this.formCalcula.valid){
      this.tempoContribuicao = this.formCalcula.controls.tempoContribuicao.value;
      this.entrouAntes       = this.formCalcula.controls.entrouAntes.value;
      this.sexo              = this.formCalcula.controls.sexo.value;
      this.categoria         = this.formCalcula.controls.categoria.value;
      this.nascimentoAtual   = this.formCalcula.controls.nascimentoAtual.value;
  
      this.mensagemRegraGeral = this.regraGeral().mensagemRegraGeral;
      this.mensagemPontos = this.transicaoPontos().mensagemPontos;
      this.mensagemTempoMinimoIdadeMinima = this.regraTempoMinimoIdadeMinima().mensagemTempoMinimoIdadeMinima
      this.mensagemFatorPrevidenciarioPedagio = this.regraFatorPrevidenciarioPedagio().mensagemFatorPrevidenciarioPedagio
      this.mensagemIdadeMinimaPedagioCompleto = this.regraIdadeMinimaPedagioCompleto().mensagemIdadeMinimaPedagioCompleto

      this.mensagemDetalheRegraGeral = this.regraGeral().mensagemDetalheRegraGeral;
      this.mensagemDetalhePontos = this.transicaoPontos().mensagemDetalhePontos;
      this.mensagemDetalheTempoMinimoIdadeMinima = this.regraTempoMinimoIdadeMinima().mensagemDetalheTempoMinimoIdadeMinima
      this.mensagemDetalheFatorPrevidenciarioPedagio = this.regraFatorPrevidenciarioPedagio().mensagemDetalheFatorPrevidenciarioPedagio
      this.mensagemDetalheIdadeMinimaPedagioCompleto = this.regraIdadeMinimaPedagioCompleto().mensagemDetalheIdadeMinimaPedagioCompleto

      this.mostrar_tabela = true;
    } else {
      alert("Verifique o preenchimento dos campos obrigatórios!")
    }
  };

  verIdade(){
    var dataAtual = moment();
    var dataIdade55: any;
    var dataIdade57: any;
    var dataIdade60: any;
    var dataIdade62: any;
    var dataIdade65: any;
    if (this.nascimentoAtual !== null){
      idade       = dataAtual.diff(this.nascimentoAtual, 'years');
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
      var mensagemRegraGeral = "ATINGIDO."
      var mensagemDetalheRegraGeral = "Você já contribuiu por "+tempoCalculo+" ano(s) e atingiu a idade mínima para a sua categoria: "+idadeMinCalculo+"."
    } else {
      var tempoTexto: string = "";
      var idadeTexto: string = "";
      if(tempoFaltaContribuir > 0){
        tempoTexto = "FALTA contribuir por "+tempoFaltaContribuir+ " ano(s)"
      } else {
        tempoTexto = "Você já ATINGIU o tempo mínimo de contribuição."
      }
      if (idadeMinima > 0){
        idadeTexto = "Daqui a "+idadeMinima+" ano(s) você ATINGIRÁ a idade mínima."
      } else {
        idadeTexto = "Você já ATINGIU a idade mínima."
      }
      var mensagemRegraGeral = "Tempo NÃO ATINGIDO"
      var mensagemDetalheRegraGeral = tempoTexto+" "+idadeTexto
    }
   return {mensagemRegraGeral:mensagemRegraGeral, mensagemDetalheRegraGeral: mensagemDetalheRegraGeral}
  }

  transicaoPontos(){
    let tempoTotal = Number(this.tempoContribuicao)
    let idadeCalculo = Number(this.verIdade().idade)
    let dataAtual = new Date();
    let anoAjustado = Number(moment(dataAtual).format('YYYY'))
    var mensagemPontos: string = '';
    var mensagemDetalhePontos: string = '';

    if (this.sexo === 'feminino'){
      var pontosValidos = this.tabela(anoAjustado).pontosMulher
    } else {
      var pontosValidos = this.tabela(anoAjustado).pontosHomem
    }
    if((tempoTotal+idadeCalculo)>pontosValidos){
      mensagemPontos = "ATINGIU os pontos!"
      mensagemDetalhePontos = "Eram necessários "+pontosValidos+" pontos e você já possui "+(tempoTotal+idadeCalculo)+" pontos"
    } else {
      var pontosFaltantes = pontosValidos - (tempoTotal+idadeCalculo)
      const anos = Math.floor(pontosFaltantes/2);
      const remainder = pontosFaltantes % 2; // => 1
      var txtTempoFaltante = remainder ==1 ? anos+' ano(s) 6 meses ' : anos+ ' ano(s)'  
      mensagemPontos = "FALTAM " +pontosFaltantes+" pontos."
      mensagemDetalhePontos = "Caso continue contribuindo a expectativa é de se aposentar em "+txtTempoFaltante+" por esta regra."
    }
    return { mensagemPontos:mensagemPontos, mensagemDetalhePontos: mensagemDetalhePontos}
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
    var txtMesCalculo:         string = '';
    var mensagemTempoMinimoIdadeMinima: string = '';
    var mensagemDetalheTempoMinimoIdadeMinima: string = '';

    if (this.sexo === 'feminino'){
      if(this.categoria==='professor') {
        tempoMinCalculo = 30;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoProfessora;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesMulher;
        txtMesCalculo = mesCalculo==0? '': 'e '+txtMesCalculo+' meses';
      } else {
        tempoMinCalculo = 30;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoMulher;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesMulher;
        txtMesCalculo = mesCalculo==0? '': 'e '+txtMesCalculo+' meses';
      }
    } else if (this.sexo === 'masculino'){
      if(this.categoria==='professor') {
        tempoMinCalculo = 35;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoProfessor;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesHomem;
        txtMesCalculo = mesCalculo==0? '': 'e '+txtMesCalculo+' meses';
      } else {
        tempoMinCalculo = 35;
        idadeMinCalculo = this.idadeAjustadaComMeses(AnoAtual).anoHomem;
        mesCalculo = this.idadeAjustadaComMeses(AnoAtual).mesHomem;
        txtMesCalculo = mesCalculo==0? '': 'e '+txtMesCalculo+' meses';
      }
    }

    if (tempoMinCalculo > tempoCalculo){
      tempoFaltante = tempoMinCalculo - tempoCalculo;
    } else {
      tempoFaltante = 0;
    }
    if (idadeMinCalculo > idadeCalculo) {
      idadeFaltante = idadeMinCalculo - idadeCalculo;
      mensagemTempoMinimoIdadeMinima = "Tempo NÃO ATINGIDO.";
      mensagemDetalheTempoMinimoIdadeMinima = "Pela regra da idade mínima, você poderá se aposentar quando cumprir "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) "+txtMesCalculo+" de idade. Faltam "+idadeFaltante+" ano(s).";
    } else if (idadeMinCalculo == idadeCalculo) {
      idadeFaltante = 0;
      if (mesCalculo > mesIdade) {
        mesFaltante = mesCalculo - mesIdade;
        mensagemTempoMinimoIdadeMinima = "Tempo NÃO ATINGIDO.";
        mensagemDetalheTempoMinimoIdadeMinima = "Pela regra da idade mínima, você poderá se aposentar quando cumprir "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) "+txtMesCalculo+" de idade. Faltam "+mesFaltante+" meses.";
      } else {
        mesFaltante = 0;
        mensagemTempoMinimoIdadeMinima = "Tempo ATINGIDO.";
        mensagemDetalheTempoMinimoIdadeMinima = "Você já cumpriu "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) "+txtMesCalculo+" de idade."
      }
    } else if (idadeMinCalculo < idadeCalculo){
      idadeFaltante = 0;
      mesFaltante = 0;
      mensagemTempoMinimoIdadeMinima = "Tempo ATINGIDO.";
      mensagemDetalheTempoMinimoIdadeMinima = "Você já cumpriu "+tempoMinCalculo+ " ano(s) de contribuição e "+idadeMinCalculo+" ano(s) e "+mesCalculo+".";
    }

  return{mensagemTempoMinimoIdadeMinima: mensagemTempoMinimoIdadeMinima, mensagemDetalheTempoMinimoIdadeMinima: mensagemDetalheTempoMinimoIdadeMinima}
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
    let mensagemDetalheFatorPrevidenciarioPedagio: string = '';

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
        mensagemFatorPrevidenciarioPedagio = "Tempo ATINGIDO"
        mensagemDetalheFatorPrevidenciarioPedagio = "Pela regra de transição com fator previdenciário, você pode se aposentar por ter cumprido "+novoTempo+" ano(s) de contribuição.";
      } else{
        mensagemFatorPrevidenciarioPedagio = "Você ATINGIRÁ o tempo em "+tempoAjustado+" ano(s).";
        mensagemDetalheFatorPrevidenciarioPedagio = "Pela regra de transição com fator previdenciário você precisa contribuir por "+tempoAjustado+" ano(s). O que acontecerá quando cumprir "+novoTempo+" ano(s). Ou seja, "+tempoAjustado+" ano a mais do tempo mínimo de contribuição ("+tempoMinCalculo+").";
      }
    } else {
      mensagemFatorPrevidenciarioPedagio = "Não se aplica."
      mensagemDetalheFatorPrevidenciarioPedagio = "O tempo de pedágio é menor do que o tempo mínimo obrigatório"
    }
  return{mensagemFatorPrevidenciarioPedagio: mensagemFatorPrevidenciarioPedagio, mensagemDetalheFatorPrevidenciarioPedagio: mensagemDetalheFatorPrevidenciarioPedagio}
  }

  regraIdadeMinimaPedagioCompleto(){
    const idadeCalculo = Number(this.verIdade().idade)
    const tempoCalculo = Number(this.tempoContribuicao);
    let tempoMinCalculo: number = 0;
    let idadeMinCalculo: number = 0;
    let diferencaIdade:  number = 0;
    let pedagio:         number = 0;
    let tempoAjustado:   number = 0;
    let tempoFaltante:   number = 0;
    let mensagemIdadeMinimaPedagioCompleto: string = '';
    let mensagemDetalheIdadeMinimaPedagioCompleto: string = '';

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
        mensagemIdadeMinimaPedagioCompleto = "Tempo ATINGIDO."
        mensagemDetalheIdadeMinimaPedagioCompleto = "Você ATINGIU a regra de idade mínima com 100% de pedágio ao cumprir "+tempoAjustado+" ano(s) de contribuição e "+idadeMinCalculo+" ano(s) de idade."
      } else {
        mensagemIdadeMinimaPedagioCompleto = "Idade ATINGIDA. Faltam "+tempoFaltante+" ano(s) de contribuição"
        mensagemDetalheIdadeMinimaPedagioCompleto = "Você já ATINGIU a idade mínima de "+idadeMinCalculo+" ano(s). Faltam "+tempoFaltante+" ano(s) de contribuição para cumprir os "+tempoAjustado+" ano(s) referentes ao pedágio de 100%."
      }
    } else {
      diferencaIdade = idadeMinCalculo - idadeCalculo;
      mensagemIdadeMinimaPedagioCompleto = "Tempo não ATINGIDO"
      mensagemDetalheIdadeMinimaPedagioCompleto = "Você ainda NÃO ATINGIU a idade mínima de "+idadeMinCalculo+" ano(s). Dentro de "+diferencaIdade+" ano(s) e após cumprir "+tempoAjustado+" ano(s) de contribuição você terá cumprido a idade mínima e o pedágio de 100%."
    }

  return{mensagemIdadeMinimaPedagioCompleto: mensagemIdadeMinimaPedagioCompleto, mensagemDetalheIdadeMinimaPedagioCompleto: mensagemDetalheIdadeMinimaPedagioCompleto}
  }
  
    ngOnInit(): void {
    
    }
}