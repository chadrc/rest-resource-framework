import ResourceProp from "./ResourceProp";

/**
 *  Container for all information that a resource can have.
 **/
class ResourceModel {
    private _properties: { [key:string]: ResourceProp; };
    
    constructor(properties: { [key:string]: any; }) {
        this._properties = properties;
    }
    
    get properties() {
        return this._properties;
    }
}

export default ResourceModel;