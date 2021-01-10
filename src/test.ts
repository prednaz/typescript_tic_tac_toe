type Point = {x: number, y: number};

let point1: [number, number] = [2,2];

let center: Point = {x: 0, y:0};

let unit: {x: number, y: number} = {x: 1, y: 1};

center = unit;

console.log(unit);
console.log(point1);
