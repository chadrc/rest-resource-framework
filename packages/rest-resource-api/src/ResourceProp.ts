import InvalidValueError from './errors/InvalidValueError';
import MustHaveValueError from './errors/MustHaveValueError';
import CannotHaveNullDefaultWithNotNullError from './errors/CannotHaveNullDefaultWithNotNullError';

/**
 *  Types that resource can have as properties. Contains validation logic.
 *  Has factory methods for creating predefined types.
 **/
class ResourceProp {
    private _jsType: string;
    private _default: any;
    private _notNull: boolean = false;
    
    constructor(jsType: string) {
        this._jsType = jsType;
    }
    
    public validateValue(value: any): any {
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
        
        if (!this.isProperType(value)) {
            throw new InvalidValueError(value, this._jsType);
        }
        
        return value;
    }
    
    public Default(value: any): ResourceProp {
        if (!this.isProperType(value) && value !== null) {
            throw new InvalidValueError(value, this._jsType);
        }
        
        if (value === null && this._notNull === true) {
            throw new CannotHaveNullDefaultWithNotNullError();
        }
        
        this._default = value;
        return this;
    }
    
    public get NotNull(): ResourceProp {
        if (this._default === null) {
            throw new CannotHaveNullDefaultWithNotNullError();
        }
        
        this._notNull = true;
        return this;
    }
    
    private isProperType(value: any): boolean {
        return ResourceProp.getTypeOf(value) === this._jsType;
    }
    
    public static get String(): ResourceProp {
        return new ResourceProp(ResourceProp.getTypeOf(new String()));
    }
    
    public static get Number(): ResourceProp {
        return new ResourceProp(ResourceProp.getTypeOf(new Number()));
    }
    
    public static get Boolean(): ResourceProp {
        return new ResourceProp(ResourceProp.getTypeOf(new Boolean()));
    }
    
    public static get Date(): ResourceProp {
        return new ResourceProp(ResourceProp.getTypeOf(new Date()));
    }
    
    public static get Symbol(): ResourceProp {
        return new ResourceProp(ResourceProp.getTypeOf(Symbol()));
    }
    
    public static get Object(): ResourceProp {
        return new ResourceProp(ResourceProp.getTypeOf(new Object()));
    }
    
    private static getTypeOf(value: any): string {
        return Object.prototype.toString.call(value);
    }
}

export default ResourceProp;