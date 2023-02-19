function start(){
    var buttonTrigger = document.querySelector('#button');
    buttonTrigger.addEventListener('click', handleButtonClick);
    handleButtonClick();
}


function getImc(weight, heigth){
    return weight / (heigth * heigth);
}

function handleButtonClick(){
    var inputWeigth = document.querySelector("#input-weight");
    var inputHeigth = document.querySelector("#input-height");
    var imcResult = document.querySelector('#imc-value');
    var imcClassification = document.querySelector('#classification')

    var weight = Number(inputWeigth.value);
    var height = Number(inputHeigth.value);
    var imc = getImc(weight, height);
    console.log (imc);

    imcResult.textContent = imc.toFixed(2).replace('.',',');


    if (imc >= 16 && imc < 17){
        imcClassification.textContent = ('Muito abaixo do peso')
    }
    
    else if (imc >= 17 && imc < 18.5){
        imcClassification.textContent = ('Abaixo do peso')
    }
    
    else if (imc >= 18.5 && imc < 25){
        imcClassification.textContent = ('Peso normal')
    }
    
    else if (imc >= 25 && imc < 30){
        imcClassification.textContent = ('Acima do peso')
    }
    
    else if (imc >= 30 && imc < 35){
        imcClassification.textContent = ('Obesidade grau I')
    }
    else if (imc >= 35 && imc <= 40){
        imcClassification.textContent = ('Obesidade grau II')
    }
    else if (imc > 40){
        imcClassification.textContent = ('Obesidade grau III')
    }
    else{
        imcClassification.textContent = ('Valor inválido')
    }
    
}
 
start();