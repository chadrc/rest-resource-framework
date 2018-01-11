import * as request from 'supertest';
import {expect} from 'chai';
import RestResourceServer from '../src/RestResourceServer';

describe("GET root", () => {
    it("Responds OK", (done: any) => {
        let server = new RestResourceServer;
        request(server.app)
            .get('/')
            .expect(200, done);
    });
})