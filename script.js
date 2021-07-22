class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement= previousOperandTextElement;
        this.currentOperandTextElement= currentOperandTextElement;
        this.clear()
    }

    clear(){
        this.previousOperand= '';
        this.currentOperand='';
        this.operation= undefined;

    }
    del(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString()+ number.toString();


    }
    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = `${this.currentOperand} ${this.operation}`;
        this.currentOperand= '';

    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
      }
    getDisplay(){

    }
    updateDisplay(){
        this.previousOperandTextElement.textContent= this.previousOperand;
        this.currentOperandTextElement.textContent= this.currentOperand;
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator= new Calculator(previousOperandTextElement,currentOperandTextElement);


numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click',button =>{
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',()=>{
    calculator.del();
    calculator.updateDisplay();
})



