import { IFizzBuzzService } from "./types";

export class FizzBuzzService implements IFizzBuzzService {
    GetWord(n: number): string {
        if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
        if (n % 5 === 0) return 'Buzz';
        if (n % 3 === 0) return 'Fizz';
        return n.toString();
    }
}