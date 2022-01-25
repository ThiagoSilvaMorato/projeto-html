//Pegando valores para extrato de transações
var merchandiseRaw = localStorage.getItem("merchandise");
if (merchandiseRaw != null) {
  var merchandiseArray = JSON.parse(merchandiseRaw);
} else {
  var merchandiseArray = [];
}

function desenhaTabela(merchandise) {
  // console.log(document.querySelectorAll("#merch-table .merchandise1"));

  currentLines = [...document.querySelectorAll("#merch-table .merchandise1")];
  currentLines.forEach((element) => {
    element.remove();
  });

  for (index in merchandise) {
    console.log(merchandise);
    document.querySelector("#merch-table").innerHTML += `
    <div class="merchandise1">
      <span class="signal">${merchandise[index].transactionType == "c" ? "-" : "+"}</span>
      <span class="ipsum">${merchandise[index].merchandiseName}</span>
      <span class="merch-value">${merchandise[index].merchandiseValue}</span>
    </div>`;
  }
}

desenhaTabela(merchandiseArray);
