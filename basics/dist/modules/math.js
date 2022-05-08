"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subtract = exports.Add = void 0;
//Addition function
function Add(x, y) {
    const sum = x + y;
    return sum;
}
exports.Add = Add;
//Subtraction function
function Subtract(x, y) {
    if (x >= y) {
        return x - y;
    }
    else {
        return "You will get a negative value!";
    }
}
exports.Subtract = Subtract;
