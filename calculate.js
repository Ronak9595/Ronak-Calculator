let string = "";
let shouldReset = false;

const input = document.querySelector("input");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    input.focus();

    const btnValue = e.target.innerHTML;
    let start = input.selectionStart;
    let end = input.selectionEnd;

    if (btnValue === "=") {
      try {
        let expr = input.value;
        if (expr.includes('%')) {
          expr = expr.replace(/(\d+(\.\d+)?)([+\-])(\d+(\.\d+)?)%/g, function(match, base, _, operator, percent) {
            return base + operator + "(" + base + "*" + percent + "/100)";
          });
          expr = expr.replace(/(\d+(\.\d+)?)%/g, function(match, num) {
            return "(" + num + "/100)";
          });
        }
        string = eval(expr);
        input.value = string;
        input.setSelectionRange(string.toString().length, string.toString().length);
        shouldReset = true;
      } catch {
        input.value = "Error";
        string = "";
        shouldReset = true;
      }
    } else if (btnValue === "D") {
      if (input.value === "Error") {
        input.value = "";
        string = "";
        shouldReset = false;
        return;
      }
      if (start > 0) {
        input.value = input.value.slice(0, start - 1) + input.value.slice(end);
        input.setSelectionRange(start - 1, start - 1);
      }
      string = input.value;
    } else if (btnValue === "AC") {
      string = "";
      input.value = "";
      shouldReset = false;
    } else {
      if (input.value === "Error" || shouldReset) {
        input.value = "";
        start = 0;
        end = 0;
        shouldReset = false;
      }
      input.value = input.value.slice(0, start) + btnValue + input.value.slice(end);
      const newPos = start + btnValue.length;
      input.setSelectionRange(newPos, newPos);
      string = input.value;
    }
  });
});
