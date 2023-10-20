/*
Transzpilálás s futtatás:
npm i --global typescript
tsc index.ts
node index.ts

Direkt futtatás:
npm i --global ts-node
ts-node index.ts
*/

// komplex objektum
type Person = {
  name: string;
  age: number;
  email?: string; // opcionális
};

// alias tömbre
type Persons = Person[];

// típusos paramú függvény
function logPerson(person: Person): void {
  const { name, age, email } = person;
  console.log(`name: ${name}, age: ${age}, e-mail: ${email ?? 'unknown'}`);
}

const persons: Persons = [
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
