import ResourceModel from "./ResourceModel";

/**
 *  Contains all logic for manipulating resources
 **/
class ResourceEngine {
    constructor() {
    }
    
    create(model: ResourceModel, args: object): any {
        let resource: any = {};
        
        let properties = model.properties;
        let keys = Object.keys(properties);
        
        for (let key of keys) {
            let prop = properties[key];
            if (!prop) {
                throw new Error(`${name} does not have ${prop} property.`)
            }
            let value = args[key];
            
            let validatedValue = prop.validateValue(value);
            resource[key] = validatedValue;
        }
        
        return resource;
    }
}

export default ResourceEngine;