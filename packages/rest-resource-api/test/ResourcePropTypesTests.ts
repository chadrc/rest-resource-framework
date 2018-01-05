import {expect} from 'chai';
import ResourcePropType from '../src/ResourcePropType';
import InvalidValueError from '../src/errors/InvalidValueError';
import MustHaveValueError from '../src/errors/MustHaveValueError';

describe("Resource Props", () => {
    
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