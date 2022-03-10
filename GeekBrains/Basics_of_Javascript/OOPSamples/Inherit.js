class BaseClass {
  changeName(newName) {
    this.name = newName;
  }
}

class PersonClass extends BaseClass {
  constructor(name, age) {
    age = age || 20;

    super();
    this.name = name;
    this.age = age;
  }
}

const personFromClass = new PersonClass("Anton", 30);
personFromClass.changeName("Boris");
console.log(personFromClass);

function Person(name, age) {
  this.name = name;
  this.age = age;

  return this;
}

Person.prototype = {
  changeName: function (newName) {
    this.name = newName;
  },
};

let person = new Person("Anton", 30);
person.age = 50;
person = new Person("Anton", 30);

console.log(person);

person.changeName("Maxim");
console.log(person);
