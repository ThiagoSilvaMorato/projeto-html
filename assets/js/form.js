//Máscara simples
function testaCampoValor(e) {
  e.preventDefault();

  if (/[0-9]/g.test(e.key)) {
    e.target.value += e.key;
  } else {
    alert("Digite apenas os números!");
  }
}

function currencyMask(e) {
  var value = e.target.value;
  e.target.value = formatCurrency(value);
}

//Testar o formulário
function testaFormulario(e) {
  e.preventDefault();

  //Testando o campo "Valor" com expressão regular
  var valuePattern = /[^R\$ (\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$]+/g;
  if (valuePattern.test(e.target.elements["value"].value)) {
    alert("Número inválido!");
    return false;
  }

  //Testando o campo "Nome da mercadoria"
  if (e.target.elements["merchandise-name"].value.length == 0) {
    alert('Preencha o campo "Nome da mercadoria"!');
    return false;
  }

  //Testando o campo "Tipo de Transação"
  if (e.target.elements["buy-sell"].value.length == 0) {
    alert('Preencha o campo "Tipo de transação"!');
    return false;
  }

  //Salvando no Local Storage
  var merchandiseRaw = localStorage.getItem("merchandise");
  if (merchandiseRaw != null) {
    var merchandise = JSON.parse(merchandiseRaw);
  } else {
    var merchandise = [];
  }

  merchandise.push({
    transactionType: e.target.elements["buy-sell"].value,
    merchandiseName: e.target.elements["merchandise-name"].value,
    merchandiseValue: e.target.elements["value"].value,
  });

  localStorage.setItem("merchandise", JSON.stringify(merchandise));

  desenhaTabela(merchandise);
}
