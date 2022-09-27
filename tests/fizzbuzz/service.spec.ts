import { FizzBuzzService } from "../../src/fizzbuzz/service"

describe('FizzBuzzService Check', () => {
  test.each([[1, '1'], [2, '2'], [3, 'Fizz'], [4, '4'], [5, 'Buzz'], [6, 'Fizz'], [7, '7'], [8, '8'], [9, 'Fizz'], [10, 'Buzz']
    , [11, '11'], [12, 'Fizz'], [13, '13'], [14, '14'], [15, 'FizzBuzz']])('数字が %d のとき %s が返却されること', (number, ans) => {
      const fizzBuzzService = new FizzBuzzService();
      const act = fizzBuzzService.GetWord(number);
      expect(act).toEqual(ans);
    })
})