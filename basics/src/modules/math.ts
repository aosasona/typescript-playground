//Addition function
export function Add(x: number, y: number) {
  const sum: number = x + y;
  return sum;
}

//Subtraction function
export function Subtract(x: number, y: number) {
  if (x >= y) {
    return x - y;
  } else {
    return "You will get a negative value!";
  }
}
