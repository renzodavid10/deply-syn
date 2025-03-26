import { expect, test } from "vitest";

const sumar = (a: number, b: number) => a + b;

test('Mi suma', () => {  
    //arrange
    const a=1;
    const b=2;

    //act
    const result= sumar(a,b)
   
     //assert

     expect(result).toBe(3)
})