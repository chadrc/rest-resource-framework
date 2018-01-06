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
        
        expect(stringFunc).to.throw(InvalidValueError);
        expect(numberFunc).to.throw(InvalidValueError);
        expect(booleanFunc).to.throw(InvalidValueError);
        expect(dateFunc).to.throw(InvalidValueError);
    });
    
    it("Setting null default on NotNull prop throws CannotHaveNullDefaultWithNotNullError", () => {
        let func1 = () => ResourceProp.String.Default(null).NotNull;
        let func2 = () => ResourceProp.String.NotNull.Default(null);
        
        expect(func1).to.throw(CannotHaveNullDefaultWithNotNullError);
        expect(func2).to.throw(CannotHaveNullDefaultWithNotNullError);
    });
    
    it("Validating undefined on notNull, no default ResourceProp should throw MustHaveValue", () => {
        let stringProp = ResourceProp.String.NotNull;
        let func = () => stringProp.validateValue(undefined);
        
        expect(func).to.throw(MustHaveValueError);
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
        
        expect(stringFunc).to.throw(InvalidValueError);
        expect(numberFunc).to.throw(InvalidValueError);
        expect(booleanFunc).to.throw(InvalidValueError);
        expect(dateFunc).to.throw(InvalidValueError);
    });
})