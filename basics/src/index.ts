import path from "path";

//Strings
const firstName: string = "John";
const lastName: string = "Smith";

// console.log(`${firstName} ${lastName}`);

//Using path module
const currentDir: string = path.join(__dirname, "src");

// console.log(currentDir);

//Numbers || Integers
const age: number = 17;

// console.log(`${firstName} is ${age} years old`);

const x: number = 5;

for (var i: number = 0; i < x; i++) {
  const total: number = x + i;
  //   console.log(`${total}`);
}

//Arrays
const people: Array<string> = ["John", "Jude", "Michael"];

people.forEach((person: string) => {
  //   console.log(`${person}`);
});

//Mixed array
type profile = [String, String, Number, String]; //custom array type

const John: profile = ["John", "Doe", 17, "New York"];

for (var i: number = 0; i < John.length; i++) {
  //   console.log(John[i]);
}

//JSON Object
type customer = { name: String; email: String; address: String; date: Date };

const customerOne: customer = {
  name: "John Diggle",
  email: "johndiggle@gmail.com",
  address: "123 Main Street, CA",
  date: new Date("12/01/2011"),
};

console.log(customerOne.name, customerOne.email);
