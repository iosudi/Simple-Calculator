$("button").on("mousedown", function () {
  $(this).addClass("clicked");
});

$("button").on("mouseup", function () {
  $(this).removeClass("clicked");
});

$("button").on("mouseout", function () {
  $(this).removeClass("clicked");
});

let runningTotal = 0;
let buffer = "0";
let previousOperator;

const display = $(".display");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  display.text(buffer);
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "←":
     if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case "C":
      buffer = "0";
      runningTotal = 0;
      break;

    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "÷":
    case "×":
    case "−":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  }
}

function init() {
  $(".calc-button").on("click", function (event) {
    buttonClick(event.target.innerText);
  });
}

init();
