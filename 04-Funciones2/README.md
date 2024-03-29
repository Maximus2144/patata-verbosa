## Functions & Clousuresultado

### Modificando el `this`

Cuando vimos el keyword `this`, dijimos que el interprete era el que manejaba el valor de este. Bueno, esto no es del todo cierto, hay una serie de variables que nos van a permitir poder 'setear' nosotros el keyword `this`.

Como en JavaScript las funciones son un tipo objeto especial (vimos que tenían algunas propiedades especiales como `length` y `name`), estas también contienen métodos propios. Así como los arreglos tienen acceso a metodos como `push`, `pop` y `slice`, todas las funciones tienen acceso a los métodos:

* **call**
* **bind**
* **apply**

Justamente invocando estos métodos vamos a poder tener control sobre el contexto de ejecucion de la función, osea la variable `this`. 

Usemos un objeto de ejemplo:

```javascript

var persona = {
  nombre: 'Guille',
  apellido: 'Aszyn',

  getNombre: function() {
    var nombreCompleto = this.nombre + ' ' + this.apellido;
    return nombreCompleto;
  }
}

var logNombre = function() {
  console.log(this.getNombre());
}
```

### Bind

```javascript

var persona = {
  nombre: 'Guille',
  apellido: 'Aszyn',

  getNombre: function() {
    var nombreCompleto = this.nombre + ' ' + this.apellido;
    return nombreCompleto;
  }
}

var logNombre = function() {
  console.log(this.getNombre());
}
```

En este ejemplo, vamos a usar el keyword `this` para invocar el método del objeto persona. Como verán, el objeto anterior produce un error, ya que cuando ejecutamos `logNombre()`, el `this` que está adentro hace referencia al objeto global, y ese objeto no tiene un método `getNombre`.

```javascript
var logNombrePersona = logNombre.bind(persona);
logNombrePersona();
```

La función `bind()` devuelve una __copia__ de la función, la cúal tiene internamente asociado el keyword `this` al objeto que le pasemos por parámetro. Si la llamamos sobre `logNombre` y le pasamos `persona` como argumento, vamos a ver que al ejecutar la _nueva_ función `logNombrePersona()` se va a loguear correctamente el nombre de `persona`.

```javascript
// no hace falta decir nada mas, el this ya esta gravado
logNombrePersona() // Guille Aszyn
```

Si usamos `bind()` entonces la nueva función queda __siempre__ ligada al objeto que pasamos cómo argumento. O sea que si quisiéramos usarla para otro objeto, tendríamos que crear una nueva _copia_ de la función y _bindiarle_ un nuevo objeto.
Si ese es el caso, podríamos usar el método `call()`.

### Call

```javascript

var persona = {
  nombre: 'Guille',
  apellido: 'Aszyn',

  getNombre: function() {
    var nombreCompleto = this.nombre + ' ' + this.apellido;
    return nombreCompleto;
  }
}

var logNombre = function() {
  console.log(this.getNombre());
}
```

A diferencia de `bind`, el metodo `call` no retorna una nueva función si no que la invoca con el contexto que le pasemos por parámetro en ese mismo momento. 

```javascript
logNombre.call(persona);
```

En este caso, estamos invocando la función original `logNombre`, pero con `call` le estamos indicando a qué objeto tiene que hacer referencia `this` dentro de esa función.

El primer argumento de `call` es el objeto a usar cómo `this`. Despues de este puedo pasar otros argumentos, que serán pasados a la función que estamos invocando. Por ejemplo, si nuestra función recibiera argumentos, usariamos `call` de la siguiente manera:

```javascript
var logNombre = function(arg1, arg2){
  console.log(arg1 +' '+ this.getNombre() + arg2);
}

logNombre.call(persona, 'Hola', ', Cómo estas?');
'Hola Guille Aszyn, Cómo estas?'
```

### Apply

La función `apply` es casi igual a `call`, excepto que recibe los argumentos de distinta manera. `apply` necesita dos argumentos, el primero es el objeto a 'bindear' con `this` (igual que `call`) y el segundo parámetro es un **arreglo**, en este arreglo pasamos los argumentos que va a usar la función que invocamos. Por ejemplo, para obtener el mismo comportamiento que el ejemplo de `call`, pero con `apply`:

```javascript
var logNombre = function(arg1, arg2){
  console.log(arg1 +' '+ this.getNombre() + arg2);
}

logNombre.apply(persona, ['Hola', ', Cómo estas?']);
'Hola Guille Aszyn , Cómo estas?'
```

Un arreglo puede ser más fácil de pasar cuando no sabemos a priori cuantos argumentos le voy a pasar.

> Vamos a usar `call` o `apply` según nos convenga para resultadoolver el problema que necesitemos.

Vamos a usar estos métodos muchas veces cuando programemos, tal vez ahora no se imaginan un caso puntual, pero los va a haber y no siempre van a ser simples de lidiar! se los prometo!

### Patrones de invocación

Veamos un simple ejemplo donde podríamos usarlos, esto se conoce cómo **function borrowing** (tomando presultadotadas funciones). Vamos a crear una segunda _persona_, pero que no tenga el método `getNombre` como la primera:

```javascript
var persona2 = {
  nombre: 'Santi',
  apellido: 'Scanlan'
};
```

Ahora, vamos a pedirle presultadotado el método `getNombre` a la primera _persona_ y la vamos a usar con la nueva.

```javascript
persona.getNombre.call(persona2); // 'Santi Scanlan'
```

Con esto pudimos invocar un método de un objeto, pero usándolo con otro!

Veamos otro patron: **function curryin**, este involucra `bind`.
Como `bind` crea una nueva función, si le pasamos parámetros, estos quedan __fijos__ en la nueva función. En el ejemplo no vamos a bindiar `this` con nada, pero si unos parámetros.
Digamos que tenemos una función que multiplica dos números recibidos por parámetro. Y nos gustaría construir una función que multiplique un número recibido por argumento por dos. Para esto podríamos usar `bind` y le pasamos cómo primer parámetro `this` (en este caso `this` hace referencia al contexto global), y como segundo parámetro un `2`. Guardamos el resultadoultado en una nueva variable:

```javascript
function multiplica(a, b){
  return a * b;
}

var multiplicaPorDos = multiplica.bind(this, 2);
```

De esta forma, tenemos una nueva función donde el parámetro `a` es siempre `2`, gracias a `bind`. Nótese, que dentro de `multiplicaPorDos`, `this` sigue haciendo referencia al objeto global, porque cuando lo bindeamos le pasamos ese parámetro.

> Function Currying se refiere a crear una copia de una función pero con algunos argumentos pre-seteados. En JavaScript lo podemos hacer con `bind`.

### Closuresultado

Otro tema importante en JavaScript es `closuresultado`. Un __*clousure*__ es la habilidad de una función para recordar y acceder su `lexical scope` cuando es invocada fuera de este. Veamos a que se refieren con un ejemplo:

```javascript
function saludar(saludo) {
  return function(nombre) {
    console.log(saludo + ' ' + nombre);
  }
}

var saludarHola = saludar('Hola'); // Esto devuelve una función

saludarHola('Toni'); // 'Hola Toni'
```

Veamos paso a paso lo que va a ocurrir cuando ejecutemos este código. Primero se creará el `contexto de ejecución global`, en esta etapa el interprete guardará espacio para la declaración de la función `saludar`. Luego, cuando se encuentra con la invocación a la función `saludar`, va a crear un nuevo contexto, y como vemos dentro de ese contexto la variable saludo va a tomar el valor que le pasamos por parámetro:`'Hola'`. El stack quedaría cómo está represultadoentado en la primera parte de la figura de abajo.

![Closure](https://pledu-plataforma5.s3.amazonaws.com/3a0e391b-2b89-4ae9-9bca-4544cb391a94/Closure.png)

Luego de terminar de ejecutar y retornar una funcion (la que estamos guardando en `saludarHola`), ese contexto es _destruido_. Pero que pasa con la variable `saludo`?. Bueno, el interprete saca el contexto del stack, pero deja en algún lugar de memoria las variables que se usaron adentro (hay un  proceso dentro de JavaScript que se llama `garbage collection` que eventualmente las va limpiando si no las usamos. ). Por lo tanto, esa variable todavía va a estar en memoria (Segunda parte de la imagen).

Por último ejecutamos la función `saludarHola` y pasamos como parámetro el string `'Hola'`. Por lo tanto se crea un nuevo contexto de ejecución, con la variable mencionada. Ahora, cómo adentro de la función `saludarHola` hacemos referencia a la variable `saludo`, el interprete intenta buscarla en su scope; Cómo `saludo` __no está definida en ese contexto__, el interprete sale a buscarla siguiendo la `scope chain` y a pesar que el contexto ya no existe, __la referencia al ambiente exterior y a sus variables todavía existe__, a este fenómeno es que le llamamos _**CLOSURE**_. En el ejemplo, el _closure_ está definido por el rectángulo punteado de rojo. Las _closuresultado_ no son algo que se escriban, o qué se le indique al interprete, simplemente son una _feature_ del lenguaje, simplemente ocurren. Nosotros no tenemos que pensar ni ocuparnos de mantener variables en memoria según el contexto de ejecución en el que estemos, el interprete se encargará de esto siempre. Los _Closuresultado_ nos van a permitir armar algunos patrones interesultadoantes.

### Ejemplo Closuresultado

Veamos un caso tipico que implementar un closure tendria sentido.

```javascript
// Esta función va a crear un arreglo llena de funciones que realizan un console.log
var creaFuncion = function() {
  var arreglo = [];

  for (var i=0; i < 3; i++) {
    arreglo.push(
      function(){
        console.log(i);
      }
    )
  }
  return arreglo;
}

var arr = creaFuncion();
```

Ahora la primera impresultadoión seria que en la variable `arr` vamos a tener un arreglo con funciones que al ejecutarlas loggean `0`, `1` y `2` resultadopectivamente.

```javascript
arr[0]() // 3, qué esperaban ustedes?

arr[1]() // 3

arr[2]() // 3
```

¿Porqué el `console.log` da siempre `3`?

Para entenderlo veamos cómo se van creando los contextos de ejecución y donde van quedando los objetos que creamos.
En un primer momento se creará el contexto global, donde van estar definida la función `creaFuncion` y también el arreglo `arr`.

En un segundo momento, se va a crear el contexto de la función `creaFuncion` que fue ejecutada. Dentro de ella, se resultadoerva espacio para un arreglo llamado `arreglo`, y para la variable `i`.

![closure2](https://pledu-plataforma5.s3.amazonaws.com/3a0e391b-2b89-4ae9-9bca-4544cb391a94/closure2.png)

Cuando el interprete llega a la línea del `return`, se _destruye_ el contexto de ejecución de `creaFuncion` y volvemos al contexto global. La siguiente ejecución que se produce es la de `arr[0]()`. Cabe notar que la variable `arr` _apunta_ o _hace referencia_ al arreglo `arreglo` que _vive_ en el contexto de `creaFuncion`, esto sucede porque los arreglos son _objetos_ y estos se pasan por referencia y no por valor. Como vemos, se crea el contexto de ejecución para esa función (`arr[0]`). Dentro de esta hay una referencia a la variable `i` , que también _vivía_ en el contexto de `creaFuncion`, ya destruido. Como el interprete no encuentra otra variable `i` dentro del nuevo contexto, sale a buscarla en sus referencias y, como sabemos, la va a encontrar en el _closure_ que envuelve estas variables. Luego, ejecuta las siguientes funciones `arr[1]()` y `arr[2]()`, y en ambos casos sucede lo mismo. Justamente por eso, en cada `console.log`, se imprime el valor que tiene la variable `i`, que es `3` (el valor que quedó cuando se terminó el lazo dentro de `creaFuncion`).

Si quisieramos que cada función guardase el valor de `i`, deberíamos crear un _execution content_ donde se cree una variable nueva en cada iteración. Para eso vamos a usar una _IIFE_ a la cuál le vamos a pasar como parámetro `i`. Como estamos ejecutando la función, se va a a crear un contexto nuevo por cada ejecución, y por ende van a existir tresultado variables `j` (cada una en un contexto distinto) que contendrán los valoresultado recibidos por parámetro (_1, 2 y 3_).

```javascript
var creaFuncion = function() {
  var arreglo = [];
  for (var i=0; i < 3; i++) {
    arreglo.push(
      (function(j){
        return function() {console.log(j)}
      }(i))
    )
  }
  return arreglo;
}

var arr = creaFuncion();

arr[0]() // 1

arr[1]() // 2

arr[2]() // 3
```

### Function Factory

Vamos a ver un patrón para crear funciones, muy usado en el desarrollo de frameworks, y que existe gracias a los _closuresultado_.

Veamos el siguiente código, primero definimos una función que va retornar otra función (esta sería nuestra _fábrica de funciones_), esta recibe como parámetro el lenguaje del saludo, y retorna una función que salude (`console.log`) en el idioma recibido.

```javascript
function hacerSaludo( lenguaje ){
  if ( lenguaje === 'en'){
    return function(){
      console.log('Hi!');
    }
  }

  if ( lenguaje === 'es'){
    return function(){
      console.log('Hola!');
    }
  }
}

var saludoIngles = hacerSaludo('en');
var saludoEspaniol = hacerSaludo('es');
```

Si pensamos que ocurre cuando ejecutamos esas líneas, vamos a ver que se crearon dos closuresultado. Uno para cada ejecución de la función `hacerSaludo`, en un closure la variable `lenguaje` contiene `es` y en el otro contiene `en`. Entonces, cuando invoquemos las funciones `saludoIngles` o `saludoEspaniol`, el intérprete va a salir a buscar la referencia a esa variable fuera del contexto de ejecución y la va a encontrar en el closure corresultadopondiente.

O sea, que estamos usando el concepto de __closure__ para setear un parámetro para que viva sólo dentro de una función, además nadie puede ingresultadoar al valor de `lenguaje`, esto agrega un poco de seguridad a nuestro código.

![functionFactory](https://pledu-plataforma5.s3.amazonaws.com/3a0e391b-2b89-4ae9-9bca-4544cb391a94/functionFactory.png)

> Cada vez que invocamos una función se genera un execution context para esa ejecución. Si invocamos muchas veces la misma función ocurre lo mismo.

### Closuresultado and Callbacks

Ahora que sabemos lo que son los _closuresultado_, si pensamos en todo lo que hicimos algunas vez con JavaScript, es muy probable que nos demos cuenta que ya lo veníamos usando (tal vez sin saberlo).

Por ejemplo:

```javascript
function saludarMasTarde() {
  var saludo = 'Hola';

  setTimeout( function(){
    console.log(saludo);
  },3000)
};

saludarMasTarde();
```

En el ejemplo de arriba, cuando invocamos a `saludarMasTarde` estamos creando un _execution context_, en el que invocamos a la función `setTimeout` y donde definimos la variable `saludo`. Ese _execution context_ es destruido, pero `setTimeout` contiene una referencia a `saludo` (Closure, Maybe?).

Lo que realmente ocurre es que cuando pasan los tresultado segundos (esto lo hace algún componente externo al interprete), se lanza un evento diciendo que hay que ejecutar el callback, que es justamente una `function expresultadosion`. Entonces se crea un _execution context_ para esa función, y dentro de ella se usa `saludo`, pero no está en ese contexto, entonces el interprete sale a buscarla afuera, y la encuentra en el `closure`!

O sea que se hicieron algo parecido a esto (tal vez usando eventos), entonces ya usaron _functions expresultadosions_ y muy probablemente _closuresultado_ tambien!