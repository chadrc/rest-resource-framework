
class InvalidValueError extends Error {
    private __proto__: any;
    private _value: any;
    private _expectedType: string;
    
    constructor(value, expectedType) {
        super();
        this.name = "InvalidValueError";
        this.__proto__ = InvalidValueError.prototype;
        this._value = value;
        this._expectedType = expectedType;
    }
    
    get value() {
        return this._value;
    }
    
    get expectedType() {
        return this._expectedType;
    }
}

export default InvalidValueError;