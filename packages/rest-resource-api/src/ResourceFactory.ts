import ResourceModel from "./ResourceModel";
import InvalidModelArgs from './errors/InvalidModelArgs';

/**
 *  Contains all logic for manipulating resources
 **/
class ResourceFactory {
    constructor() {
    }
    
    create(model: ResourceModel, args: object): any {
        let resource: any = {};
        
        let properties = model.properties;
        let keys = Object.keys(properties);
        
        let errors = [];
        for (let key of keys) {
            let prop = properties[key];
            let value = args[key];
            let validatedValue;
            try {
                validatedValue = prop.validateValue(value);
            } catch (err) {
                throw new InvalidModelArgs();
            }
            resource[key] = validatedValue;
        }
        
        return resource;
    }
}

export default ResourceFactory;