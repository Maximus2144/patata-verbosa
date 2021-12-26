// La funcion constructora es un molde para crear objetos
// ------------------------------------------------------
// La funcion constructora es un molde para crear objetos
// ------------------------------------------------------

function CalculadoraNPI(){
    let newArr = []
    let acumula = 0
    this.agregar = function(num){newArr.push(num)}
    this.__proto__.sumar = function(){
      try{
        if(newArr.length < 2){
          throw 'La calculadoraNPI necesita por lo menos 2 números';
        } else{
          let num1 = newArr.pop()
          let num2 = newArr.pop()
          newArr.push(num1 + num2)
        }    
    } catch (e) {
      throw e;
    }}
    this.__proto__.restar = function(){
      try{
        if(newArr.length < 2){
          throw 'La calculadoraNPI necesita por lo menos 2 números';
        } else{
          let num1 = newArr.pop()
          let num2 = newArr.pop()
          newArr.push(num2 - num1)
        }
      } catch(e){
        throw e
      }}
  
    this.__proto__.dividir = function(){
      try{
        if(newArr.length < 2){
          throw 'La calculadoraNPI necesita por lo menos 2 números';
        } else{
          let num1 = newArr.pop()
          let num2 = newArr.pop()
          newArr.push(num2 / num1)
        }
      } catch (e){
        throw e
      }
      
    }
    this.__proto__.multiplicar = function(){
      try{
        if(newArr.length < 2){
         throw 'La calculadoraNPI necesita por lo menos 2 números'
        } else{
          let num1 = newArr.pop()
          let num2 = newArr.pop()
          newArr.push(num1 * num2)
        }
      } catch(e){
        throw e
      }
    }
    this.__proto__.valor = function() {
      return newArr[newArr.length - 1]
    }
}
