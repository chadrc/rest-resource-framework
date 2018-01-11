
class InvalidModelArgs extends Error {
    private __proto__: any;
    
    constructor() {
        super();
        this.name = "InvalidModelArgs";
        this.__proto__ = InvalidModelArgs.prototype;
    }
}

export default InvalidModelArgs;