function concatenar() {
    let args = Array.prototype.slice.call(arguments);
    return args.join(``);
  }
  
  function invocarFunciones() {
    let acumuladora = "";
    for (let i = 0; i < arguments.length; i++) {
      acumuladora = acumuladora + arguments[i]();
    }
    return acumuladora;
  }
  
  function creadorDeIncrementos(num) {
    return function (num2) {
      return num + num2;
    };// closuresultado
  }
  
  function invocacionUnica (fun) {
    let ejecuto = false;
    return function () {
      if (!ejecuto) {
        ejecuto = true;
        return fun();
      }
    };
  };
  
  function objetoConClousure(){
    let resultado = 0
    return {
      incremento:function(){resultado++},
      incrementoPor10:function(){resultado+=10},
      pedirValor:function(){return resultado},
      cambiarValor:function(num){resultado = num}
    }
  }
  
 
  function ListaDeFuncionesInvitados(arregloInvitados, codigoSecreto) {
    let newArr = []
    for(let i = 0; i < arregloInvitados.length; i++){
        let invitado = arregloInvitados[i]
        let validacion = function(codigoDeEntrada){
            if(codigoDeEntrada === codigoSecreto){
                return invitado
            } else{
                return 'código secreto: invalido'
            }
        }
        newArr.push(validacion)
    }
    return newArr
 }
/*function armarListaDeInvitados(funcionesInvitados, codigoSecreto){
  return funcionesInvitados
}
*/
function armarListaDeInvitados(funcionesInvitados, codigoSecreto){
  let arr = []
  for(let i = 0; i < funcionesInvitados.length; i++){
      arr.push(funcionesInvitados[i](codigoSecreto))
  }
  return arr
}