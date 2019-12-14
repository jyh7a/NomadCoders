// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

// Refer to

// white space
// https://www.codingfactory.net/10597

// ellipsis
// https://jos39.tistory.com/211

// g-value
const g_previousResult = document.querySelector(".previousResult");
const g_nowResult = document.querySelector(".nowResult");
const clickPad = document.querySelectorAll(".clickPad");

const calculaotr = {
   previousResult: "",
   nowResult: "",
   operandResult: "",
   operatorResult: "",
   operand: [0],
   operator: [],
   numberArray: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
   lastInput: "operand",
   inputNum: 0,
   checkFirstClick: true
};

let tempOperand = "";

// function

// inputFunction
function inputF(e) {
   // console.log(e.currentTarget.innerText);
   const whatIsIt = e.currentTarget.innerText;
   const {
      numberArray
   } = calculaotr;
   let {
      operandResult,
      operatorResult,
      operand,
      operator,
      lastInput,
      inputNum,
      checkFirstClick,
      previousResult,
      nowResult
   } = calculaotr;
   // calculaotr
   // console.log(whatIsIt);
   // console.log(typeof whatIsIt);
   // console.log(numberArray.indexOf(whatIsIt));

   if (numberArray.indexOf(whatIsIt) !== -1) {
      // number
      if (checkFirstClick) {
         operand.pop();
      }

      console.log("첫번쨰");
      tempOperand += whatIsIt;
      if (tempOperand === '0') return tempOperand = "";
      console.log(tempOperand);
      operand.push(parseFloat(whatIsIt));
      console.log(operand);
      console.log(operator);
      calculaotr.inputNum++;
      // if ((calculaotr.lastInput === "operand")) {
      //    calculaotr.nowResult = tempOperand;
      // } else {
      //    calculaotr.nowResult += tempOperand;
      // }


      // operatorResult

      // debugger;
      if (lastInput === "operand") {
         if (tempOperand.length > 1) {
            operandResult = tempOperand.slice(tempOperand.length - 1);
         } else {
            operandResult = tempOperand;
         }
      } else {
         operandResult = tempOperand;
      }

      calculaotr.nowResult += operandResult;
      calculaotr.lastInput = "operand";
   } else {
      // debugger;
      // operator or C or =

      if (whatIsIt === "C") {
         // all reset

         tempOperand = "";
         operandResult = "";
         operatorResult = "";
         calculaotr.previousResult = "";
         calculaotr.nowResult = "";
         calculaotr.operand = [0];
         calculaotr.operator = [];
         calculaotr.lastInput = "operand";
         calculaotr.inputNum = 0;
         calculaotr.checkFirstClick = true;
         g_nowResult.innerText = 0;

         g_previousResult.innerText = "";
         return;
      } else if (whatIsIt === "=") {
         g_previousResult.innerText = nowResult + " =";
         g_nowResult.innerText = "" + eval(nowResult);

         tempOperand = "";
         operandResult = "";
         operatorResult = "";
         calculaotr.previousResult = "";
         // calculaotr.nowResult = "";
         calculaotr.operand = [0];
         calculaotr.operator = [];
         calculaotr.lastInput = "operand";
         calculaotr.inputNum = 0;
         // calculaotr.checkFirstClick = true;
         // g_nowResult.innerText = 0;
         return;
      }

      if (lastInput === "operator") {
         operator.pop();
      }
      console.log("두번째");
      if (inputNum > 0) {
         for (let i = 0; i < inputNum; i++) {
            calculaotr.operand.pop();
         }
         operand.push(parseFloat(tempOperand));
      }
      operator.push(whatIsIt);
      console.log(operand);
      console.log(operator);
      calculaotr.inputNum = 0;
      tempOperand = "";
      calculaotr.lastInput = "operator";

      if (checkFirstClick) {
         if (lastInput === "operator") {
            calculaotr.nowResult = calculaotr.nowResult.slice(
               0,
               nowResult.length - 3
            );
         }
         calculaotr.nowResult += "0 " + operator[operator.length - 1] + " ";
      } else {
         if (lastInput === "operator") {
            calculaotr.nowResult = calculaotr.nowResult.slice(
               0,
               nowResult.length - 3
            );
         }
         calculaotr.nowResult += " " + operator[operator.length - 1] + " ";
      }

      // 앞에 + - 고 뒤에 * / 면 먼저계산안해주고
      // 앞에 + - 고 뒤에 + - 면 먼저거 계산
      // 앞에 * / 고 뒤에 + - 면 먼저거 계산
      // 앞에 * / 고 뒤에 * / 면 먼저거 계산


      if (operator.length > 1) {
         if (
            (operator[operator.length - 1] == "*" ||
               operator[operator.length - 1] == "/") &&
            (operator[operator.length - 2] == "+" ||
               operator[operator.length - 2] == "-")
         ) {
            // 먼저 계산 안해주는곳
            console.log("먼저 계산 X");
         } else {
            // debugger;
            // 먼저 계산 해주는곳
            console.log("먼저 계산 O");
            g_previousResult.innerText = g_nowResult.innerText + ' ' + operator[operator.length - 1];
            g_nowResult.innerText = "" + eval(nowResult);
            calculaotr.operator = [];
            return;
         }
      }
   }

   console.log("");
   calculaotr.checkFirstClick = false;
   g_nowResult.innerText = calculaotr.nowResult;
   console.log("nowResult", calculaotr.nowResult);
}

// handlerBind
clickPad.forEach(function (clickPad) {
   clickPad.addEventListener("click", inputF);
});

// init
function init() {}

init();

// 초기값은 0
// 수 연산자 수 연산자 앞에 연산자가있으면
// 수 연산자 수 를 계한후 하나로 통합 + 연산자

//  previousResult 3 + 3 +
//  nowResult 6
// 숫자 6
// 연산자 +

// 연산자가 2개일때 + - 보다 * / 를 먼저해야함
// 변수 +,- 변수 * / 일때는 계산 바로안한고
// 4 + 2 + 3
// 1. 4 + 2
// 2. +누르는순간(*,/)아니니까
// 3. 4+2+ 가위로가고
// 4. 6은 아래로

// 4 + 2 * 3
// 4 + 2
// 4 + 2 *
// 3
// 그리고 다음 연산자가 눌리면 2 * 3을 먼저 계산
// 6 + 3 * 4 + 1

// 암튼 * / 우선 연산해주게 해야한는데 복잡하니까
// 그냥 연산자 2번째꺼일때 계산해주자...

// 앞에 + - 고 뒤에 * / 면 먼저계산안해주고
// 앞에 + - 고 뒤에 + - 면 먼저거 계산
// 앞에 * / 고 뒤에 + - 면 먼저거 계산
// 앞에 * / 고 뒤에 * / 면 먼저거 계산