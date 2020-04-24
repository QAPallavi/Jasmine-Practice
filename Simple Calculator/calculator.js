function Calculator() {
    this.total = 0;
}

Calculator.prototype.add = function(number) {
    return this.total += number;
}

Calculator.prototype.subtract = function(number) {
    return this.total -= number;
}

Calculator.prototype.multiply = function(number) {
    return this.total *= number;
}

Calculator.prototype.divide = function(number) {
    if (number == 0) {
        throw new Error('Cannot divide by zero');
    }

    return this.total /= number;
}

//Using Getter Method
Object.defineProperty(Calculator.prototype, 'version', {

    get: function() {

        //Using Promise
        return fetch('https://gist.githubusercontent.com/QAPallavi/b56504ed67fc6c6a24c6b6bd9fddcdf4/raw/6316d587727b085954db345ab2c9677f89555511/package.json')
            .then(function(result) {
                return result.json()
            })

        .then(function(json) {
            return json.version;
        })
    },

    enumerable: true,
    configurable: true,

})