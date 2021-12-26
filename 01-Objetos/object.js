function setPropsOnObj(obj) {
    obj.p = 5;
    obj["plataforma"] = 5;
    obj.proximo = function (num) {
      return num + 1;
    };
    obj.la = { clave: { secreta: { es: 404 } } };
  }
  
  function setPropsOnArr(array){
      array.hola = function(){
          return 'Hola!'
      }
      array["river"] = "plate"
      array[0] = 5
      array.doble = function(num){
          return num * 2
      }
  }

  function setPropsOnFunc(functionObject){
  


    var date = new Date();
    functionObject.year = date.getFullYear()
  

 functionObject.mitad = function(num){
      return num / 2
  }
  functionObject.prototype.helloWorld = function(helloWorld){
    return 'Hello World'
  }
}

