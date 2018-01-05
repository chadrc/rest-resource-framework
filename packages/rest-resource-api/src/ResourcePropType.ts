
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
        
        if (this._default !== undefined && !value && this._notNull) {
            validatedValue = this._default;
        }
        
        if (typeof validatedValue !== this._jsType) {
            throw new TypeError(`'${validatedValue}' is an invalid value for type ${this._jsType}`);
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
        return new ResourcePropType("string");
    }
    
    public static get Number(): ResourcePropType {
        return new ResourcePropType("number");
    }
}

export default ResourcePropType;