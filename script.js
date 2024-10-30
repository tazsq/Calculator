"use strict";
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const ac = document.querySelector(".AC");
const ops = document.querySelectorAll(".op");
const ans = document.querySelector(".answer");
const mod = document.querySelector(".mod");
const del = document.querySelector(".DEL");
display.textContent = "";
let display__number = "0";
let eqn = "0";
const opIsActive = function () {
  let opsArray = Array.from(ops);
  if (opsArray.some((op) => op.classList.contains("btn-active"))) return true;
  else return false;
};
const deactivateOP = function () {
  ops.forEach((op) => {
    op.classList.remove("btn-active");
  });
  ans.classList.remove("btn-active");
};
const displayNumbers = function () {
  numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
      deactivateOP();
      const val = e.target.textContent;

      if (val === "." && display__number.includes(".")) return;
      if (display__number === "0" && val === "0") return;

      if (display__number === "0" && val !== ".") {
        display__number = val;
      } else {
        display__number += val;
      }

      eqn += val;
      display.textContent = display__number;
    });
  });
};

displayNumbers();

ops.forEach((op) => {
  op.addEventListener("click", (e) => {
    display__number = "";
    if (eqn === "") {
      activateOP(op);
      return;
    }
    if (opIsActive()) {
      eqn = eqn.slice(0, -1);
    }
    activateOP(op);
    eqn += e.target.dataset.operator;
    console.log(eqn);
  });
});

const clear = function () {
  display.textContent = "";
  display__number = "0";
  eqn = "0";
  deactivateOP();
};
ac.addEventListener("click", () => {
  clear();
});
const activateOP = function (op) {
  deactivateOP();
  op.classList.add("btn-active");
};

ans.addEventListener("click", () => {
  deactivateOP();
  activateOP(ans);

  if (["/", "*", "+", "-"].includes(eqn.charAt(eqn.length - 1))) {
    eqn = eqn.slice(0, -1);
  }
  if (eqn.charAt(0) === "0" && eqn.charAt(1) !== ".") {
    eqn = eqn.slice(1, eqn.length);
  }
  console.log(eqn);
  try {
    const result = eval(eqn);
    display__number = result.toString();
    display.textContent = display__number;
    eqn = display__number;
  } catch (error) {
    display.textContent = "ERROR";
    display__number = "0";
    eqn = "";
  }
});
mod.addEventListener("click", function (e) {
  display__number = (display__number / 100).toString();
  eqn = display__number;
  display.textContent = display__number;
});
del.addEventListener("click", function () {
  ans.classList.remove("btn-active");
  if (opIsActive()) {
    deactivateOP();
    eqn = eqn.slice(0, -2);
    console.log(eqn);
  } else {
    eqn = eqn.slice(0, -1);
  }
  display__number = display__number.slice(0, -1);
  console.log(display__number);
  display.textContent = display__number;
});
