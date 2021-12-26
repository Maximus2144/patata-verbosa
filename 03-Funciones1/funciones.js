function crearCalculadora() {
    let resultado = 0
    return {
      valor: function () {
        return resultado;
      },
      sumar: function (num) {
        return (resultado = resultado + num);
      },
      restar: function (num) {
        return (resultado = resultado - num);
      },
      reset: function () {
        return (resultado = 0);
      },
      /* multiplicar:function(num){
        return (resultado = resultado * num)
      } */
    }
}