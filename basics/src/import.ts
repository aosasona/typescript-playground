import { Add, Subtract } from "./modules/math";

//Using the addition function
const AddFunc: number = Add(5, 10);
console.log(AddFunc);

//Using the subtraction function
const SubtractFunc: number | string = Subtract(20, 10);
console.log(SubtractFunc);
