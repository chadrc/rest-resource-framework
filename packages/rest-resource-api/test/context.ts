import * as request from 'supertest';
import {expect} from 'chai';
import RestResourceServer from '../src/RestResourceServer';
import ResourceEngine from '../src/ResourceEngine';
import ResourceProp from '../src/ResourceProp';
import ResourceModel from '../src/ResourceModel';

const User = new ResourceModel({
    id: ResourceProp.Number.NotNull,
    name: ResourceProp.String.NotNull.Default(""),
    registered: ResourceProp.Boolean.NotNull.Default(false),
    birthday: ResourceProp.Date.Default(null)
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
})