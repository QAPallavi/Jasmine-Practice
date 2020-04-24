describe('calculator.js', function() {

    describe('Calculator', function() {

        beforeEach(function() {

            //Executed ONCE before all specs are executed
            calculator = new Calculator();
            calculator2 = new Calculator();

        });

        //Matcher - toBe(expected), toBeFalsy(expected)
        it('should initialize the total', function() {

            //Assertion
            expect(calculator.total).toBe(0);
            expect(calculator.total).toBeFalsy();

        });

        //Matcher - toEqual(expected), toBeTruthy(expected)
        it('can be instantiated', function() {
            jasmine.addMatchers(customMatchers);

            //Assertion
            expect(calculator).toBeTruthy();
            expect(calculator2).toBeTruthy();
            expect(calculator).toEqual(calculator2);

            //Custom Matchers
            expect(calculator).toBeCalculator();
            expect(2).not.toBeCalculator();

        });

        //Negative Assertion
        it('instantiates unique object', function() {

            //Assertion
            expect(calculator).not.toBe(calculator2);

        });

        //Matcher - toBeUndefined()
        it('has common operations undefined', function() {

            //Assertion
            expect(calculator.add).not.toBeUndefined();
            expect(calculator.subtract).not.toBeUndefined();
            expect(calculator.multiply).not.toBeUndefined();
            expect(calculator.divide).not.toBeUndefined();

        });

        //Matcher - toBeDefined()
        it('has common operations defined', function() {

            //Assertion
            expect(calculator.add).toBeDefined();
            expect(calculator.subtract).toBeDefined();
            expect(calculator.multiply).toBeDefined();
            expect(calculator.divide).toBeDefined();

        });

        //Matcher - toBeNull(), toContain()
        it('can overwrite total', function() {

            calculator.total = null;

            //Assertion
            expect(calculator.total).toBeNull();
            expect(calculator.constructor.name).toContain("Calc")

        });

        describe('add()', function() {

            it('should add numbers to total', function() {

                calculator.add(5);

                //Assertion
                expect(calculator.total).toBe(5);

            });

            //Matcher - toMatch(), Asymmetric Matcher
            it('returns total', function() {

                calculator.total = 50;

                //Assertion
                expect(calculator.add(20)).toBe(70);
                expect(calculator.total).toMatch(/-?\d+/);
                expect(typeof calculator.total).toMatch('number');
                expect(calculator.total).toBeNumber();

                //Asymmetric Matcher
                expect(calculator.total).toEqual(jasmine.anything());
                expect(function() {}).toEqual(jasmine.anything());

            });

        });

        describe('subtract()', function() {

            it('should subtract from total', function() {

                calculator.total = 30;
                calculator.subtract(5);

                //Assertion
                expect(calculator.total).toBe(25);

            });

        });

        describe('multiply()', function() {

            it('should multiply total by number', function() {

                calculator.total = 100;
                calculator.multiply(2);

                //Assertion
                expect(calculator.total).toBe(200);

            });

            //Matcher - toBeNaN()
            it('does not handle NaN', function() {

                calculator.total = 20;
                calculator.multiply('a');

                //Assertion
                expect(calculator.total).toBeNaN();

            });

            //Matcher - toThrow(), toThrowError()
            it('handles divide by zero', function() {

                //Assertion
                expect(function() { calculator.divide(0) }).toThrow();
                expect(function() { calculator.divide(0) }).toThrowError(Error);
                expect(function() { calculator.divide(0) }).toThrowError(Error, 'Cannot divide by zero')

            });

        });

        describe('divide()', function() {

            it('should divide total by number', function() {

                calculator.total = 200;
                calculator.divide(2);

                //Assertion
                expect(calculator.total).toBe(100);

            });

        });

        describe('get version', function() {

            it('fetches version from external source', async function(done) {

                //Using the done callback, Async & Await
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(

                    new Response('{ "version": "1.0" }')

                ))

                const version = await calculator.version;

                //Assertion
                expect(version).toBe('1.0');

                done();

            });

        });

    });

});