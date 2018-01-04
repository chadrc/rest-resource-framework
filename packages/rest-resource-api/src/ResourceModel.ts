import ResourcePropType from "./ResourcePropType";

/**
 *  Container for all information that a resource can have.
 **/
class ResourceModel {
    private _properties: { [key:string]: ResourcePropType; };
    
    constructor(properties: { [key:string]: any; }) {
        this._properties = properties;
    }
    
    get properties() {
        return this._properties;
    }
}

export default ResourceModel;