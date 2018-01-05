import * as request from 'supertest';
import {expect} from 'chai';
import RestResourceServer from '../src/RestResourceServer';
import ResourceEngine from '../src/ResourceEngine';
import ResourcePropType from '../src/ResourcePropType';
import ResourceModel from '../src/ResourceModel';

const User = new ResourceModel({
    id: ResourcePropType.Number.NotNull,
    name: ResourcePropType.String.NotNull.Default(""),
    registered: ResourcePropType.Boolean.NotNull.Default(false),
    birthday: ResourcePropType.Date.Default(null)
})
        
describe("GET root", () => {
    it("Responds OK", (done: any) => {
        let server = new RestResourceServer;
        request(server.app)
            .get('/')
            .expect(200, done);
    });
    
    it("Create basic User model", () => {
        let engine = new ResourceEngine();

        let user = engine.create(User, {id: 100});
        
        expect(user.id).to.equal(100);
        expect(user.name).to.equal("");
        expect(user.registered).to.equal(false);
        expect(user.birthday).to.equal(null);
    });
    
    it("Create User with no id should fail", () => {
        let engine = new ResourceEngine();
        let func = () => engine.create(User, {});
        
        expect(func).to.throw();
    });
    
    it("Create User with number for name should fail", () => {
        let engine = new ResourceEngine();
        let func = () => engine.create(User, {
            id: 100,
            name: 1234
        });
        
        expect(func).to.throw();
    });
})