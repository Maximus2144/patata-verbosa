// Mamifero es mi funcion constructora. Es mi "molde"
function Mamifero(name){
    this.nombre = name
    this.descendencia = []
    Mamifero.prototype.saludar = function() {
      return "Hola, mi nombre es " + name
    }
    Mamifero.prototype.nuevoHijo = function(){
      let hijo = new Mamifero(this.nombre + " Jr")
      this.descendencia.push(hijo)
      return hijo
    }
  }
  // Declaramos nuestra funcion constructora "gato"
Gato.prototype = Object.create(Mamifero.prototype)
Gato.prototype.constructor = Gato
function Gato(_nombre,_color){
  Mamifero.call(this,_nombre) //  Llamamos a la función constructor de Mamífero y obtenemos sus parametros en nuestra función Gato
  this.color = _color
  Gato.prototype.nuevoHijo = function(_color){
    this.nombre = this.nombre + " Jr"
    this.color = _color
    this.descendencia.push(this)
    return this
  }
}