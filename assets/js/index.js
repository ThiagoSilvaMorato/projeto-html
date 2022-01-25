//Pegando valores para extrato de transações
var merchandiseRaw = localStorage.getItem("merchandise");
if (merchandiseRaw != null) {
  var merchandiseArray = JSON.parse(merchandiseRaw);
} else {
  var merchandiseArray = [];
}

//Formatando moeda
function formatCurrency(value) {
  var valueToFormat = String(value)
    .replace(/[R\$\., ]/g, "")
    .replace(/^(0*)/g, "");
  valueToFormat = valueToFormat.split("").reverse();

  if (valueToFormat.length < 3) {
    var length = valueToFormat.length;
    while (length < 3) {
      valueToFormat.push("0");
      length = valueToFormat.length;
    }
  }

  valueToFormat[2] = valueToFormat[2] + ",";
  var arrayPoint = valueToFormat.reverse().join("").split(",");
  arrayPoint[0] = arrayPoint[0].split("").reverse();

  for (let index = 2; index < arrayPoint[0].length; index++) {
    if (index % 3 == 0) {
      arrayPoint[0][index] = arrayPoint[0][index] + ".";
    }
  }
  arrayPoint[0] = arrayPoint[0].reverse().join("");
  arrayPoint = arrayPoint.join(",");

  return "R$ " + arrayPoint;
}

function normalizeNumberToBR(number) {
  var valueToReturn = number < 0 ? number * -1 : number;
  valueToReturn = valueToReturn.toFixed(2);
  return `${valueToReturn}`.replace(".", ",");
}
//Desenhando tabela de mercadorias
function desenhaTabela(merchandise) {
  document.querySelector("#merch-table").innerHTML = "";

  var totalValue = 0;
  if (merchandise.length > 0) {
    for (index in merchandise) {
      document.querySelector("#merch-table").innerHTML += `
      <div class="merchandise1">
        <span class="signal">${merchandise[index].transactionType == "c" ? "-" : "+"}</span>
        <span class="ipsum">${merchandise[index].merchandiseName}</span>
        <span class="merch-value">${merchandise[index].merchandiseValue}</span>
      </div>`;

      var parsedValue = Number(
        merchandise[index].merchandiseValue.replace(/[R\$ \.]+/g, "").replace(",", ".")
      );
      totalValue =
        merchandise[index].transactionType == "c"
          ? totalValue - parsedValue
          : totalValue + parsedValue;
    }
  } else {
    document.querySelector("#merch-table").innerHTML =
      "<p style='text-align: center;padding-bottom: 8px;'>Nenhuma transação cadastrada</p>";
  }

  var normalizedNumber = normalizeNumberToBR(totalValue);
  document.querySelector("#merch-total").innerHTML = formatCurrency(normalizedNumber);
  document.querySelector("#status").innerHTML = totalValue < 0 ? "(PREJUÍZO)" : "(LUCRO)";
}

desenhaTabela(merchandiseArray);

//Atribuindo função para o "Limpar dados"
function clearData() {
  alert("Deseja realmente apagar os dados?");
  localStorage.removeItem("merchandise");

  desenhaTabela([]);
}
