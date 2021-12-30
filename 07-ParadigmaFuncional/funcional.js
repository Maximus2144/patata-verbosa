function duplicar(num){
    return num * 2
  }
  
  function map(arr,duplicar){
    let arrDuplicados = []
    for(let i = 0; i < arr.length; i++){
      // Pusheo el retorno de nuestra funcion duplicar con el parametro arr[i] (cada elemento de mi arreglo)
      arrDuplicados.push(duplicar(arr[i]))
    }
    return arrDuplicados
  }
  
  function filter(arr,fun){
    let newArr = []
    for(let i = 0; i < arr.length; i++){
      if(fun(arr[i])==true){
        newArr.push(arr[i])
      }
    }
    return newArr
  }
  
  function contains(data, num) {
    // El Object.values() toma un parametro (en este caso le pasamos data) y lo convierte en un arreglo con los values
    // Luego, con el indexOf nos fijamos en que posicion esta el elemento que buscamos, si es mayor o igual a 0 entonces, el elemento se encuentra en el arreglo, si devuelve -1 es false (NO existe en el arreglo)
    if (Object.values(data).indexOf(num) >= 0) {
      return true;
    } else {
      return false;
    }
  }
  
  function cuentaPalabras(texto){
   return texto.split(" ").length
  }
  
 
  function reduce(arr, inicio, fn) {
    let acumulador = inicio;
    for (let i = 0; i < arr.length; i++) {
      acumulador = fn(acumulador, arr[i],arr);
      // fn va a ser sumatoria
      // acumulador = a / arr[i] = b
      // a + b
      // 6
    }
    return acumulador;
  }
  
  function cuentaPalabrasReduce(_,_,arr){
       let acumulador = 0
       for(let i = 0; i < arr.length; i++){
          acumulador+=cuentaPalabras(arr[i])
       }
       return acumulador
  }
  
  function sumatoria(a,b){
      return a + b
  }
  function suma(arr){
      return reduce(arr,0,sumatoria)
  }
  function every(arr,fn){
    for(let i = 0; i < arr.length; i++){
      return fn(arr[i])
    }
  }
  function every(arr,fn){
    let newArr = []
    for(let i = 0; i < arr.length; i++){
      let validar = reduce(arr,arr[i],fn)
      if(validar == true){
        newArr.push(arr[i])
      }
    }
    return arr.length == newArr.length 
  }
  
  function any(arr,fn){
    for(let i = 0; i < arr.length; i++){
      let validar = reduce(arr,arr[i],fn)
      if(validar == true){
        return true
      }
    }
    return false
  }