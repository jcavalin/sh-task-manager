import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

chai.use(chaiHttp);

export {
    chai,
    expect,
    app
}