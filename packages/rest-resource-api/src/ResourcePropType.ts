
/**
 *  Types that resource can have as properties. Contains validation logic.
 *  Has factory methods for creating predefined types.
 **/
class ResourcePropType {
    private _default: any;
    private _notNull: boolean = false;
    
    public validateValue(value: any): any {
        if (this._default !== undefined && !value && this._notNull) {
            return this._default;
        }
        return value;
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
        return new ResourcePropType();
    }
    
    public static get Number(): ResourcePropType {
        return new ResourcePropType();
    }
}

export default ResourcePropType;