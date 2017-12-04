import * as request from 'supertest';
import RestResourceServer from '../src/RestResourceServer';

describe("GET root", () => {
    it("Responds OK", (done: any) => {
        let server = new RestResourceServer;
        request(server.app)
            .get('/')
            .expect(200, done);
    })
})