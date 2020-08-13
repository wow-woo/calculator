const display = document.querySelector(".display");
const btn_cal = document.querySelectorAll(".cal>div");

let num = { beforeCalc: "", currentVal: "" };
let oper = { onOff: false, chracter: "" };
const calc = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

const calcHandler = (e) => {
  const data = e.currentTarget.dataset.info;

  if (data === "+" || data === "-" || data === "*" || data === "/") {
    //edge cas : user clicks operators first
    if (num.currentVal) {
      oper.onOff = true;
    }

    if (num.beforeCalc && num.currentVal) {
      num.beforeCalc = parseInt(num.beforeCalc, 10);
      num.currentVal = parseInt(num.currentVal, 10);

      num.currentVal = calc[oper.chracter](num.currentVal, num.beforeCalc);
      display.textContent = num.currentVal;
      num.beforeCalc = "";
    }
    oper.chracter = data;
  } else if (data.match(/c/i)) {
    num.beforeCalc = "";
    num.currentVal = "";
    display.textContent = 0;
    oper = { onOff: false, chracter: "" };
  } else if (data === "=") {
    //sedge case : no input
    if (num.beforeCalc && num.currentVal && oper.chracter) {
      num.beforeCalc = parseInt(num.beforeCalc, 10);
      num.currentVal = parseInt(num.currentVal, 10);

      num.currentVal = calc[oper.chracter](num.currentVal, num.beforeCalc);
      display.textContent = num.currentVal;
    }
    num.beforeCalc = "";
    oper = { onOff: false, chracter: "" };
  } else {
    //hit number
    if (oper.onOff && num.currentVal) {
      num.beforeCalc += data;
    } else {
      num.currentVal += data;
      display.textContent = num.currentVal;
    }
  }
};

const btnHandler = (e) => {
  const target = e.currentTarget;
  target.classList.add("focused");
  target.removeEventListener("click", btnHandler);

  setTimeout(() => {
    target.classList.remove("focused");
    target.addEventListener("click", btnHandler);
  }, 200);
};

const clickHnadler = (e) => {
  btnHandler(e);
  calcHandler(e);
};
//except div.display
for (let i = 1; i < btn_cal.length; i++) {
  btn_cal[i].addEventListener("click", clickHnadler);
}
