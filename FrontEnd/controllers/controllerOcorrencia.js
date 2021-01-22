//quando inicia a página faz
window.onload = function () {
  verOcorrenciaAtual();
  materialUsado();
};

document.getElementById("btnTestemunhas").onclick = function () {
  confirmarOcorrencia();
};

document.getElementById("check-presenca").onclick = function() {
  materialUsado();
}

function confirmarOcorrencia(){
  fetch('http://127.0.0.1:3000/agents/7/accurring', {  //mudar a rota do fetch
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
  })
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, valor) {
        //      document.getElementById("teste").innerHTML = "Local da ocorrência: ";

        var x = document.getElementById("exampleFormControlSelect2");
        var c = document.createElement("option");
        c.text = valor.quantidade_usada + " --> " + valor.nome_material;
        x.options.add(c, 1);
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}

function materialUsado() {
  fetch("http://127.0.0.1:3000/agents/7/accurring", {
    //mudar a rota do fetch
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, valor) {
        //      document.getElementById("teste").innerHTML = "Local da ocorrência: ";

        var x = document.getElementById("exampleFormControlSelect2");
        var c = document.createElement("option");
        c.text = valor.quantidade_usada + " --> " + valor.nome_material;
        x.options.add(c, 1);
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}

//REFRESH DA TABELA
function verOcorrenciaAtual() {
  let table = $("#tabela-equipa-oco-atual").DataTable();
  fetch(`http://127.0.0.1:3000/agents/${id_ocorr}/accurring`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then((out) => {
      // $('#label_local tbody').empty();
      $.each(out, function (index, valor) {
        document.getElementById("label_local").innerHTML =
          "Local da ocorrência: " + valor.freguesia;
        document.getElementById("label_urgencia").innerHTML =
          "Grau de urgência: " + valor.descricao_urgencia;
        document.getElementById("label_nomeEquipa").innerHTML =
          "Equipa: " + valor.nome_equipa;

        table.row.add([valor.id_operacional, valor.username]).draw();
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}

function confirmarChegadaLocal(){
  fetch('http://127.0.0.1:3000/agents/7/accurring', {  //mudar a rota do fetch
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
  })
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, valor) {
       // document.getElementById("label_tempoEstimado").innerHTML =
       // "Local da ocorrência: " + valor.freguesia;
      document.getElementById("tempoReal").innerHTML =
        "Grau de urgência: " + valor.descricao_urgencia;
     // document.getElementById("label_difTempo").innerHTML =
      //  "Equipa: " + valor.nome_equipa;
      });
    })
    .catch((err) => {
      alert("Erro!" + err);
    });
}


//REFRESH DA TABELA
function tabelaHist() {
  let table = $("#tabela-historico-ocorrencias").DataTable();

  fetch("http://127.0.0.1:3000/occurrences/finished")
    .then((res) => res.json())
    .then((out) => {
      $.each(out, function (index, value) {
        table.row
          .add([
            value.id_ocorrencia,
            value.freguesia,
            value.id_equipa,
            value.descricao_urgencia,
            value.data_ocorrencia,
            "FIller",
          ])
          .draw();
      });
    })
    .catch((err) => console.error(err));
}

$(document).ready(function () {
  $("#tabela-historico-ocorrencias").DataTable();
  tabelaHist();
});
