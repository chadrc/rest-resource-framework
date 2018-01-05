
class MustHaveValueError extends Error {
    private __proto__: any;
    constructor() {
        super();
        this.name = "MustHaveValueError";
        this.__proto__ = MustHaveValueError.prototype;
    }
}

export default MustHaveValueError;