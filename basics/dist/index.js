"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
//Strings
const firstName = "John";
const lastName = "Smith";
// console.log(`${firstName} ${lastName}`);
//Using path module
const currentDir = path_1.default.join(__dirname, "src");
// console.log(currentDir);
//Numbers || Integers
const age = 17;
// console.log(`${firstName} is ${age} years old`);
const x = 5;
for (var i = 0; i < x; i++) {
    const total = x + i;
    //   console.log(`${total}`);
}
//Arrays
const people = ["John", "Jude", "Michael"];
people.forEach((person) => {
    //   console.log(`${person}`);
});
const John = ["John", "Doe", 17, "New York"];
for (var i = 0; i < John.length; i++) {
    //   console.log(John[i]);
}
const customerOne = {
    name: "John Diggle",
    email: "johndiggle@gmail.com",
    address: "123 Main Street, CA",
    date: new Date("12/01/2011"),
};
console.log(customerOne.name, customerOne.email);
