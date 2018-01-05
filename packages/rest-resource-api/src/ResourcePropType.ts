import InvalidValueError from './errors/InvalidValueError';
import MustHaveValueError from './errors/MustHaveValueError';

/**
 *  Types that resource can have as properties. Contains validation logic.
 *  Has factory methods for creating predefined types.
 **/
class ResourcePropType {
    private _jsType: string;
    private _default: any;
    private _notNull: boolean = false;
    
    constructor(jsType: string) {
        this._jsType = jsType;
    }
    
    public validateValue(value: any): any {
        let validatedValue = value;
        
        if (this._default !== undefined && value === undefined) {
            return this._default;
        }
        
        if (this._notNull === false && value === null) {
            return null;
        }
        
        if (this._default === undefined && this._notNull === true
            && (value === undefined || value === null)) {
                throw new MustHaveValueError();
        }
        
        let valType = ResourcePropType.getTypeOf(value);
        if (valType !== this._jsType) {
            throw new InvalidValueError(value, this._jsType);
        }
        
        return validatedValue;
    }
    
    public Default(value: any): ResourcePropType {
        this._default = value;
        return this;
    }
    
    public get NotNull(): ResourcePropType {
        this._notNull = true;
        return this;
    }
    
    public static get String(): ResourcePropType {
        return new ResourcePropType(ResourcePropType.getTypeOf(new String()));
    }
    
    public static get Number(): ResourcePropType {
        return new ResourcePropType(ResourcePropType.getTypeOf(new Number()));
    }
    
    public static get Boolean(): ResourcePropType {
        return new ResourcePropType(ResourcePropType.getTypeOf(new Boolean()));
    }
    
    public static get Date(): ResourcePropType {
        return new ResourcePropType(ResourcePropType.getTypeOf(new Date()));
    }
    
    private static getTypeOf(value: any): string {
        return Object.prototype.toString.call(value);
    }
}

export default ResourcePropType;