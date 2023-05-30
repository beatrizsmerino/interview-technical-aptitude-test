# Ejercicio 1

## Descripción

El fragmento de código de nuestro fichero `test.js` nos devuelve un output no deseado. Queremos imprimir un valor incremental a cada segundo pero lo que nos devuelve el código es el mismo valor en cada iteración.

```javascript
for (var i = 0; i < 5; i++) {
	setTimeout(function () {
		console.log(i);
	}, 1000);
}
```

1. Sin necesidad de ejecutar el código, ¿sabrías decirnos qué valor imprimiría por consola el script? ¿Cuál es el motivo?
2. Sabiendo que el output que buscamos es el que encuentras bajo estas líneas…
¿Cómo solucionarías el fragmento de código para que el output sea el deseado?

```
    > 0
    > 1
    > 2
    > 3
    > 4
```

## Respuestas

1. El valor que imprimiría por consola el script sería `5` en cada iteración. El motivo de esto es que se está utilizando una función de `callback` en el método `setTimeout`, la cual se ejecuta de forma asíncrona después de un retraso determinado. En el bucle `for`, se configuran múltiples `callbacks` de `setTimeout` con un retraso de **1000 ms (1 segundo)**, pero el bucle se ejecuta rápidamente. Cuando los `callbacks` finalmente se ejecutan, el valor de `i` ya ha alcanzado el valor final de `5`, por lo que ese es el valor que se imprime en cada iteración.
2. Se puede solucionar esto usando `let` en lugar de `var` dentro del bucle `for`, para declarar la variable `i`. Al hacer esto, se crea un ámbito de bloque para `i`, lo que significa que cada iteración del bucle tendrá su propia instancia de `i`. De esta manera, cada callback de `setTimeout` capturará y utilizará el valor correcto de `i`.
Además en cada vuelta del bucle `for` el argumento del `setTimeout` cambia, multiplicado `i` por **1000**. Esto significa que cada iteración se retrasará **1 segundo** adicional en comparación con la iteración anterior, de esta manera, los valores se imprimirán en intervalos de un segundo.

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}
```
