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
        let func = () => ResourceProp.String.Default(100);
        
        expect(func).to.throw(InvalidValueError);
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
        
        let func = () => stringProp.validateValue(100);
        
        expect(func).to.throw(InvalidValueError);
    });
})