/*
Transzpilálás s futtatás:
npm i --global typescript
tsc index.ts
node index.ts

Direkt futtatás:
npm i --global ts-node
ts-node index.ts
*/
// típusos paramú függvény
function logPerson(person) {
    var name = person.name, age = person.age, email = person.email;
    console.log("name: ".concat(name, ", age: ").concat(age, ", e-mail: ").concat(email !== null && email !== void 0 ? email : 'unknown'));
}
var persons = [
    {
        name: 'Name 1',
        age: 42,
        email: 'name1@aol.com',
    },
    {
        name: 'Name 2',
        age: 18,
    },
];
persons.forEach(logPerson);
