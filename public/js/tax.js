let withoutTax = document.getElementsByClassName("withoutTax");
let withTax = document.getElementsByClassName("withTax");
let tax = false;

for(element of withTax){
element.style.display = "none"
}

document.querySelector('.form-check-reverse').addEventListener("click", ()=>{
        if(!tax){
            for(element of withTax){
                element.style.display = "inline"
            }
            for(element of withoutTax){
                element.style.display = "none"
            }
            tax=true;
        }
        else{
            for(element of withTax){
                element.style.display = "none"
            }
            for(element of withoutTax){
                element.style.display = "inline"
            }
            tax=false;
        }
})