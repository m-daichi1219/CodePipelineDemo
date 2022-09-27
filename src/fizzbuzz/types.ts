type FizzBuzzString = 'Fizz' | 'Buzz' | 'FizzBuzz'

export type FizzBuzzRequestBody = {
    number: number
}

export interface IFizzBuzzController {
    _FizzBuzz: IFizzBuzzService
    Singular(number: number): FizzBuzzString | string
    Enumerable(numbers: number[]): Array<FizzBuzzString | string>
}

export interface IFizzBuzzService {
    GetWord(n: number): FizzBuzzString | string
}