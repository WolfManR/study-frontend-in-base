## Не выполняя кода, ответить, что выведет браузер и почему:

```js
if (!("a" in window)) {
    var a = 1;
}
alert(a);
```

в a будет undefined<br>
var объявляет переменные на уровне "контекста" window при первомчтении файла, поэтому в условии будет true так как поле существует, а поскольку тело условия не выполнится в alert перейдёт переменная без значения

```js
var b = function a(x) {
    x && a(--x);
};
alert(a);
```

ошибку, так как функция a создаётся как значение переменной b, и находится внутри её контекста


```js
function a(x) {
    return x * 2;
}
var a;
alert(a);
```

если честно пока не понимаю, но по документации и var и function являются "поднимаемыми" переменными объектами что запишутся как свойства контекста своего родителя, и возможно var обрабатывается раньше чем function, а поскольку function является "стандартной", то является наследником от объекта Function у которого есть переопределённая функция toString что воозвращает source code самой себя, но не понятно почему его можно вызвать без явного указания

```js
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);
```

alert выведет 10<br>
так как функция является "стандартной", в ней можно применять функционал arguments с помощью которого, в параметр функции по индексу 2, а именно в а записалось значение 10 и его же и вывело с помощью alert

```js
function a() {
    alert(this);
}
a.call(null);
```

this будет window<br>
так как функция "стандартная" и this она получает из контекста снаружи, а почему, потому что так написано в документации на MDN:

> thisArg<br>
> Значение this, предоставляемое для вызова функции fun. Обратите    внимание, что this может не быть реальным значением, видимым этим    методом: **если метод является функцией в нестрогом режиме (en-US),    значения null и undefined будут заменены глобальным объектом**, а    примитивные значения будут упакованы в объекты.

поскольку оговорка идёт только на "стандартную" функцию скорее всего при получении пустого параметра функция call просто не выполняется 
