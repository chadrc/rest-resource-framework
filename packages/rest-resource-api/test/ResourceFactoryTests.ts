import * as request from 'supertest';
import {expect} from 'chai';
import RestResourceServer from '../src/RestResourceServer';
import ResourceFactory from '../src/ResourceFactory';
import ResourceProp from '../src/ResourceProp';
import ResourceModel from '../src/ResourceModel';
import InvalidModelArgs from '../src/errors/InvalidModelArgs';

const User = new ResourceModel({
    id: ResourceProp.Number.NotNull,
    name: ResourceProp.String.NotNull.Default(""),
    registered: ResourceProp.Boolean.NotNull.Default(false),
    birthday: ResourceProp.Date.Default(null),
    email: ResourceProp.String.NotNull
})
        
describe("Resource Factory", () => {
    it("Create basic User model", () => {
        let factory = new ResourceFactory();

        let user = factory.create(User, {id: 100, email: "test@example.com"});
        
        expect(user.id).to.equal(100);
        expect(user.name).to.equal("");
        expect(user.registered).to.equal(false);
        expect(user.birthday).to.equal(null);
    });
    
    it("Multiple invalid values should throw InvalidModelArgs", () => {
        let factory = new ResourceFactory();

        let func = () => factory.create(User, {
            id: null,
            email: null
        });
        
        expect(func).to.throw(InvalidModelArgs);
    })
})