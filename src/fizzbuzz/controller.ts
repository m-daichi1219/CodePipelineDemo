import { IFizzBuzzController, IFizzBuzzService } from "./types";

export class FizzBuzzController implements IFizzBuzzController {
    _FizzBuzz: IFizzBuzzService;
    constructor(service: IFizzBuzzService) {
        this._FizzBuzz = service;
    }
    Singular(number: number): string {
        return this._FizzBuzz.GetWord(number);
    }
    Enumerable(numbers: number[]): string[] {
        throw new Error("Method not implemented.");
    }

}