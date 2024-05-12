
 let Base_Url=("https://api.exchangeratesapi.net/v1/exchange-rates/convert?access_key=ZdpXvnrwhdg9xBjm&");
let amount=document.querySelector("#input-fild");
let dropdown_from=document.querySelector("#from");
let dropdown_to=document.querySelector("#to");
let msg=document.querySelector("#message");
let btn=document.querySelector("#btn");
let from_curr=document.querySelector(".from-container");
let to_curr=document.querySelector(".to-container");
  var newOption="";

    for (currCode in countryList) {
        if ( currCode === "USD") {
            newOption+=`<option  value="${currCode}">${currCode}</option>`
          } else  {
            newOption+=`<option value="${currCode}">${currCode}</option>`;
          }
      
    }
    dropdown_from.innerHTML=newOption;
    dropdown_to.innerHTML="<option value='INR'>INR</option>"+newOption;
    dropdown_from.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
      dropdown_to.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
      const updateFlag = (element) => {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
      };

const updateExchangeRate = async () => {
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${Base_Url}from=${dropdown_from.value.toUpperCase()}&to=${dropdown_to.value.toUpperCase()}&amount=${amtVal}`;
  let response= await fetch(URL);
  let data=await response.json();
let finalAmount=data.result;
  msg.innerText = `${amtVal} ${dropdown_from.value} = ${finalAmount} ${dropdown_to.value}`;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});