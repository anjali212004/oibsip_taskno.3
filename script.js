const droplist = document.querySelectorAll(".drop-list select"),
fromcurrency = document.querySelector(".from select"),
tocurrency = document.querySelector(".to select"),
getbutton = document.querySelector("form button");

for(let i = 0; i< droplist.length; i++) {
    for(currency_code in country_code){
        let selected;
        if(i==0){
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if(i==1){
            selected = currency_code == "NPR" ? "selected" : "";
        }
        let optiontag = `<option value="${currency_code}">${currency_code}</option>`;
        droplist[i].insertAdjacentHTML("beforeend", optiontag);
        
    }
    droplist[i].addEventListener("change",e=>{
        loadFlag(e.target);
    });
    
}
function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgtag = element.parentElement.querySelector("img");
            imgtag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}
window.addEventListener("load",()=>{
    getExchangeRate();
});
getbutton.addEventListener("click",e=>{
    e.preventDefault();
    getExchangeRate();
});
 
const exchangeicon = document.querySelector(".drop-list .icon");
exchangeicon.addEventListener("click",()=>{
    let tempcode = fromcurrency.value;
    fromcurrency.value = tocurrency.value;
    tocurrency.value = tempcode;
    loadFlag(fromcurrency);
    loadFlag(tocurrency);
    getExchangeRate();
}); 

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeratetxt = document.querySelector(".exchange-rate");
    let amountval = amount.value;
    if(amountval == "" || amountval == "0"){
        amount.value = "1";
        amountval = 1;
    }
    exchangeratetxt.innerText= "getting exchange-rate..";
    let url = `https://v6.exchangerate-api.com/v6/f72da36b8a6bc2b5b2c7468c/latest/${fromcurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangerate = result.conversion_rates[tocurrency.value];
        let totalexchangerate = (amountval * exchangerate).toFixed(2);
        
        exchangeratetxt.innerText = `${amountval} ${fromcurrency.value} = ${totalexchangerate} ${tocurrency.value} `;
        console.log(exchangerate);
    }).catch(()=>{
        exchangeratetxt.innerText ="something went wrong";
    })
}