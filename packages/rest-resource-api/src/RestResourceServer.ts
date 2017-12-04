import * as express from 'express';

class RestResourceServer {
    private _app: express.Application
    
    constructor() {
        this._app = express();
        
        this._app.get('/', (req: express.Request, res: express.Response) => {
            res.send("Hello World!");
        });
    }
    
    get app() {
        return this._app;
    }
    
    start() {
        this._app.listen(8000, () => console.log("Resource server started on port 8000."))
    }
}

export default RestResourceServer;