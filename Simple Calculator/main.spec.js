describe('main.js', function() {

    describe('calculate()', function() {

        it('validates expression when the first number is invalid', function() {

            //Spy Matcher - toHaveBeenCalled(), toHaveBeenCalledWith(), toHaveBeenCalledTimes()
            spyOn(window, 'updateResult').and.stub();
            calculate('a+3');

            //Assertion
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression Not Recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);

        });

        it('validates expression when the second number is invalid', function() {

            //Spy Matcher - toHaveBeenCalled(), toHaveBeenCalledWith(), toHaveBeenCalledTimes()
            spyOn(window, 'updateResult').and.stub();
            calculate('3+a');

            //Assertion
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression Not Recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);

        });

        it('validates expression when the operation is invalid', function() {

            //Spy Matcher - toHaveBeenCalled(), toHaveBeenCalledWith(), toHaveBeenCalledTimes()
            spyOn(window, 'updateResult').and.stub();
            calculate('3_a');

            //Assertion
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression Not Recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);

        });

        it('calls add', function() {

            //Spying On Prototypes
            const spy = spyOn(Calculator.prototype, 'add');
            calculate('3+7');

            //Assertion
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledWith(7);

        });

        it('calls subtract', function() {

            //Spying On Prototypes
            const spy = spyOn(Calculator.prototype, 'subtract');
            calculate('8-4');

            //Assertion
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(4);
            expect(spy).toHaveBeenCalledTimes(1);

        });

        it('calls multiply', function() {

            //Spying On Prototypes
            const spy = spyOn(Calculator.prototype, 'multiply');
            calculate('5*4');

            //Assertion
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(4);
            expect(spy).toHaveBeenCalledTimes(1);

        });

        it('calls divide', function() {

            //Spying On Prototypes
            const spy = spyOn(Calculator.prototype, 'divide');
            calculate('10/5')

            //Assetion
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(5);

        });

        it('calls updateResult - callThrough()', function() {

            //Using callThrough()
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();
            calculate('5*5');

            //Assertion
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(25);

        });

        it('calls updateResult - using callFake()', function() {

            //Using callFake()
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake(function(number) {

                return 'It works!';

            });

            calculate('5*5');

            //Assertion
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('It works!');

        });

        it('calls updateResult - using returnValue()', function() {

            //Using returnValue()
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('Whatever [multiply] returns');
            calculate('5*5');

            //Assertion
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Whatever [multiply] returns');

        });

        it('calls updateResult - using returnValues()', function() {

            //Using returnValues()
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'Whatever [add] returns');
            calculate('5+5');

            //Assertion
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Whatever [add] returns');

        });

        it('does not handle errors', function() {

            //Using throwError()
            spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

            //Assertion
            expect(function() { calculate('5*5') }).toThrowError('some error');

        });

    });

    describe('updateResult()', function() {

        let element;

        beforeAll(function() {

            //Executed ONCE before all specs are executed
            const element = document.createElement('div');
            element.setAttribute('id', 'result');

            document.body.appendChild(element);

            //"This" Keyword
            this.element = element;

        });

        afterAll(function() {

            //Executed ONCE after all specs are executed
            document.body.removeChild(this.element);

        });

        it('adds result to DOM element', function() {

            updateResult('5');

            //Assertion
            expect(this.element.innerText).toBe('5');

        });

    });

    describe('showVersion()', function() {

        it('calls version', function() {

            //Using spyOnProperty()
            spyOn(document, 'getElementById').and.returnValue({

                innerText: null

            });

            //Using Promise
            const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
                Promise.resolve()
            )
            showVersion();

            //Assertion
            expect(spy).toHaveBeenCalled();

        });

    });

});