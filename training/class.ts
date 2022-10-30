class Fraction {
  constructor(private _numerator: number, private _denominator: number) {
  }

  get numerator() {
    return this._numerator
  }

  get denominator() {
    return this._denominator
  }
}

const f1 = new Fraction(1,2)
console.log(f1.numerator)
console.log(f1.denominator)

// f1.numerator = 3
console.log(f1.numerator)
