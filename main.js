const select = document.querySelectorAll(".currency");
const wrapper = document.getElementById("wrapper");
const container = document.querySelector(".container");
const msg = document.querySelector('.msg');
const btn = document.getElementById("btn");
const num = document.getElementById("num");
const ans = document.getElementById("ans");

    fetch("https://api.frankfurter.app/currencies")
      .then((data) => data.json())
        .then((data) => {
            wrapper.style.visibility = "hidden";
            container.style.visibility = "visible";
            display(data);
        });


    function display(data){
        const entries = Object.entries(data);
        for (let i = 0; i < entries.length; i++) {
            select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
            select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        }
    }

    btn.addEventListener("click", ()=>{
        let currency1 = select[0].value;
        let currency2 = select[1].value;
        let value = num.value;
        
        if(currency1 != currency2){
            if (num.value == "") {
                msg.innerHTML = "Enter a Number!";
            }
            else if(num.value == 0){
                msg.innerHTML = "Enter a Positive number!";
            }
            else{
                msg.innerHTML = "";
                btn.classList.add("activeLoading");
                convert(currency1, currency2, value);
            }
        } else{
            alert("Chosse Different currency");
        }
    });

    function convert(currency1, currency2, value){
        const host = "api.frankfurter.app";
        fetch(`https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`)
            .then(val => val.json())
                .then(val =>{
                    btn.classList.remove("activeLoading");
                    ans.value = Object.values(val.rates)[0];
                });
    }
    
