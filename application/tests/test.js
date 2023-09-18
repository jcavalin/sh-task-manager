import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromise from 'chai-as-promised';
import app from '../app.js';
import sinon from "sinon";

chai.use(chaiHttp);
chai.use(chaiAsPromise);

export {
    chai,
    expect,
    sinon,
    app
}