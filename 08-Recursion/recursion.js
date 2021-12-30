function factorialIterativo(num) {
  let acumulador = 1;
  for (let i = 1; i <= num; i++) {
    acumulador = acumulador * i;
  }
  return acumulador;
}

function factorial(num) {
  let casoBase = 1;
  if (num == 0) {
    return casoBase;
  }
  return (casoBase = num * factorial(num - 1));
}

function fib(num) {
  let casoBase = 1;
  if (num == 0 || num == 1) {
    return casoBase;
  }
}
function fib(num) {
  let casoBase = 1;
  if (num == 0 || num == 1) {
    return casoBase;
  }
  return (casoBase = fib(num - 1) + fib(num - 2));
}
function factores(num,arr=[]){
  if(num == 0 || num == 1){return arr}
  for(let i = 2; i <= num; i++){
      if(num % i == 0){
          arr.push(i)
          return factores(num/i,arr)
      }
  }
}

/*function factores(num, denominadores, collect) {
  const resultado = denominadores.reduce((a, b) => a * b, 1);

  if(resultado === num) {
    collect.push(denominadores)
  } else if(resultado < num) {
    for(let i = 2; i < num; i++) {
      factores(num, [...denominadores, i], collect);
    }
  }
};*/
