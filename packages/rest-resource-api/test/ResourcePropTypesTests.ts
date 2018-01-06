import {expect} from 'chai';
import ResourcePropType from '../src/ResourcePropType';
import InvalidValueError from '../src/errors/InvalidValueError';
import MustHaveValueError from '../src/errors/MustHaveValueError';
import CannotHaveNullDefaultWithNotNullError from '../src/errors/CannotHaveNullDefaultWithNotNullError';

describe("Resource Props", () => {
    
    it("Validating undefined with default should yeild default value", () => {
        let stringProp = ResourcePropType.String.Default("Hello");
        let val = stringProp.validateValue(undefined);
        
        expect(val).to.equal("Hello");
    });
    
    it("Setting an incompatible value as default should throw InvalidValue", () => {
        let func = () => ResourcePropType.String.Default(100);
        
        expect(func).to.throw(InvalidValueError);
    });
    
    it("Setting null default on NotNull prop throws CannotHaveNullDefaultWithNotNullError", () => {
        let func1 = () => ResourcePropType.String.Default(null).NotNull;
        let func2 = () => ResourcePropType.String.NotNull.Default(null);
        
        expect(func1).to.throw(CannotHaveNullDefaultWithNotNullError);
        expect(func2).to.throw(CannotHaveNullDefaultWithNotNullError);
    });
    
    it("Validating undefined on notNull, no default ResourceProp should throw MustHaveValue", () => {
        let stringProp = ResourcePropType.String.NotNull;
        let func = () => stringProp.validateValue(undefined);
        
        expect(func).to.throw(MustHaveValueError);
    });
    
    it("Validating a non-string with a String resource prop should throw InvalidValue", () => {
        let stringProp = ResourcePropType.String;
        
        let func = () => stringProp.validateValue(100);
        
        expect(func).to.throw(InvalidValueError);
    });
})