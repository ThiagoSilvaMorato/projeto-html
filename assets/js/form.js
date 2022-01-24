//Máscara simples
function testaCampoValor(e) {
  e.preventDefault();

  if (/[0-9]/g.test(e.key)) {
    e.target.value += e.key;
  }
}

function formatCurrency(e) {
  var valueToFormat = e.target.value.replace(/[R\$\., ]/g, "").replace(/^(0*)/g, "");
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

  // valueToFormat = valueToFormat.reverse().join("");
  e.target.value = "R$ " + arrayPoint;
}
