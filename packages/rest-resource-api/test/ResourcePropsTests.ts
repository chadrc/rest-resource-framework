import {expect} from 'chai';
import ResourceProp from '../src/ResourceProp';
import InvalidValueError from '../src/errors/InvalidValueError';
import MustHaveValueError from '../src/errors/MustHaveValueError';
import CannotHaveNullDefaultWithNotNullError from '../src/errors/CannotHaveNullDefaultWithNotNullError';

describe("Resource Props", () => {
    
    it("Validating undefined with default should yeild default value", () => {
        let stringProp = ResourceProp.String.Default("Hello");
        let val = stringProp.validateValue(undefined);
        
        expect(val).to.equal("Hello");
    });
    
    it("Setting an incompatible value as default should throw InvalidValue", () => {
        let stringFunc = () => ResourceProp.String.Default(100);
        let numberFunc = () => ResourceProp.Number.Default("Not a number");
        let booleanFunc = () => ResourceProp.Boolean.Default(100);
        let dateFunc = () => ResourceProp.Date.Default(false);
        let symbolFunc = () => ResourceProp.Symbol.Default("Not a symbol");
        let objectFunc = () => ResourceProp.Object.Default(100);
        
        expect(stringFunc).to.throw(InvalidValueError);
        expect(numberFunc).to.throw(InvalidValueError);
        expect(booleanFunc).to.throw(InvalidValueError);
        expect(dateFunc).to.throw(InvalidValueError);
        expect(symbolFunc).to.throw(InvalidValueError);
        expect(objectFunc).to.throw(InvalidValueError);
    });
    
    it("Setting null default on NotNull prop throws CannotHaveNullDefaultWithNotNullError", () => {
        let func1 = () => ResourceProp.String.Default(null).NotNull;
        let func2 = () => ResourceProp.String.NotNull.Default(null);
        
        expect(func1).to.throw(CannotHaveNullDefaultWithNotNullError);
        expect(func2).to.throw(CannotHaveNullDefaultWithNotNullError);
    });
    
    it("Validating undefined or null on notNull, no default ResourceProp should throw MustHaveValue", () => {
        let stringProp = ResourceProp.String.NotNull;
        let func1 = () => stringProp.validateValue(undefined);
        let func2 = () => stringProp.validateValue(null);
        
        expect(func1).to.throw(MustHaveValueError);
        expect(func2).to.throw(MustHaveValueError);
    });
    
    it("Validating a non-string with a String resource prop should throw InvalidValue", () => {
        let stringProp = ResourceProp.String;
        let stringFunc = () => stringProp.validateValue(100);
        
        let numberProp = ResourceProp.Number;
        let numberFunc = () => numberProp.validateValue("Not a number");
        
        let booleanProp = ResourceProp.Boolean;
        let booleanFunc = () => booleanProp.validateValue(100);
        
        let dateProp = ResourceProp.Date;
        let dateFunc = () => dateProp.validateValue(false);
        
        let symbolProp = ResourceProp.Symbol;
        let symbolFunc = () => symbolProp.validateValue("Not a symbol");
        
        let objectProp = ResourceProp.Object;
        let objectFunc = () => objectProp.validateValue(100);
        
        expect(stringFunc).to.throw(InvalidValueError);
        expect(numberFunc).to.throw(InvalidValueError);
        expect(booleanFunc).to.throw(InvalidValueError);
        expect(dateFunc).to.throw(InvalidValueError);
        expect(symbolFunc).to.throw(InvalidValueError);
        expect(objectFunc).to.throw(InvalidValueError);
    });
    
    it("Using custom class object as Object prop value should be allowed", () => {
        class CustomClass {
            private num: number;
        }
        
        let objectProp = ResourceProp.Object.Default(new CustomClass());
        let val = objectProp.validateValue(undefined);
        
        expect(val).to.be.an.instanceOf(CustomClass);
    });
})