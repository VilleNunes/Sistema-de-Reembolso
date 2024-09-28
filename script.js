//Seleciona os elementos do formulário
const form = document.querySelector('form');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');
const amount = document.querySelector("#amount");
const list = document.querySelector('ul');
const qtd = document.querySelector('#qtd');
const expensesTotal = document.querySelector('aside header h2');


amount.oninput = (event) =>{
  let value = amount.value.replace(/\D/g, "");
  value = Number(value) / 100;
  amount.value = formatarAmout(value);
}

function formatarAmout(value){
  value = value.toLocaleString("pr-br",{
    style:"currency",
    currency:"BRL"
  })
 return value;
}

form.onsubmit =(event)=>{
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category: category.value,
    category_id: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  
  expenseAdd(newExpense);
  formClear();
}

function expenseAdd(newExpense){
  try {
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense");
    const imgIcone = document.createElement("img");
    imgIcone.setAttribute("src", `img/${newExpense.category}.svg`);
    imgIcone.setAttribute("alt", newExpense.category);

    const info =  document.createElement("div");
    info.classList.add("expense-info");

    const strong = document.createElement("strong");
    strong.textContent = newExpense.expense;
    const span =  document.createElement('span');
    span.textContent = newExpense.category_id;
    list.appendChild(expenseItem);

    info.append(strong, span);

    const spanValor = document.createElement("span");
    spanValor.classList.add("expense-amount")
    spanValor.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase()}`
  
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.addEventListener("click", () => {
      expenseItem.remove();
      updateTotal()
    });
    
    
    expenseItem.append(imgIcone, info, spanValor, removeIcon);
    updateTotal()
    
  } catch (error) {
    console.log(Error);
    alert("Houve um erro ao salvar o gasto. Tente novamente.");
    
  }
}

function updateTotal() {
  try {
    const qtdList = list.children

  qtd.textContent = `${qtdList.length} ${qtdList.length > 1 ? "despesas" : "despesa"  }` 
    let total = 0;
    for (let index = 0; index < qtdList.length; index++) {
      
       const valorFormat = qtdList[index].querySelector(".expense-amount").textContent;
       let valor = valorFormat.replace(/[^\d]/g, "").replace(",",".");
       
       valor = parseFloat(valor)

       if(isNaN(valor)){
        return alert ("NÃO É UM VALOR VALIDO")
       }

       total += Number(valor);
       
      
    }
    expensesTotal.textContent = formatarAmout(total/100)
    
  } catch (error) {
    console.log(error);
    alert("Houve um erro ao calcular o total. Tente novamente.");
    
  }
}

function formClear(){
  expense.value = ""
  amount.value = ""
  category.value = ""

  expense.focus();  

}