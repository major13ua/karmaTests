import {StrengthPipe} from './strength.pipe';

describe('StrengthPipe', () => {

  it('should display week if strength if 5', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual('5 (weak)')

  })

  it('should display strong if strength 10', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(10)).toEqual('10 (strong)')

  })

  it('should display unbelievable if strength > 10', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(21)).toEqual('21 (unbelievable)')

  })

})
