import {chai, app, expect} from '../test.js';
import {verifyToken} from "../../src/helpers/authorizationToken.js";

describe('User controller', () => {

    describe('Authenticate', () => {

        it('Should authenticate user', (done) => {
            chai.request(app)
                .post('/api/v1/login/auth')
                .send({email: 'technician.1@shtaskmapp.com', password: 'technician.1@secret'})
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(200);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('token')
                        .and.to.be.a('string')
                        .and.not.be.empty;

                    done();
                });
        });

        it('Should require email', (done) => {
            chai.request(app)
                .post('/api/v1/login/auth')
                .send({})
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(400);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.to.equal('"email" is required');

                    done();
                });
        });

        it('Should validate email', (done) => {
            chai.request(app)
                .post('/api/v1/login/auth')
                .send({email: 'not_an_email'})
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(400);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.to.equal('"email" must be a valid email');

                    done();
                });
        });

        it('Should require password', (done) => {
            chai.request(app)
                .post('/api/v1/login/auth')
                .send({email: 'doesntexist@shtaskmapp.com'})
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(400);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.to.equal('"password" is required');

                    done();
                });
        });

        it('Should not authenticate user', (done) => {
            const data = [
                {email: 'doesntexist@shtaskmapp.com', password: 'incorrect_password'},
                {email: 'technician.1@shtaskmapp.com', password: 'incorrect_password'},
            ];

            data.forEach((dataRequest) => chai.request(app)
                .post('/api/v1/login/auth')
                .send(dataRequest)
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(401);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.to.equal('Authentication failed');
                }));

            done();
        });

        it('Should token include email and role', (done) => {
            chai.request(app)
                .post('/api/v1/login/auth')
                .send({email: 'technician.1@shtaskmapp.com', password: 'technician.1@secret'})
                .end((err, res) => {
                    expect(err).to.be.null;

                    verifyToken(res.body.token, function (error, decoded) {
                        expect(error).to.be.null;

                        expect(decoded)
                            .be.a('object')
                            .and.have.property('email')
                            .and.to.equal('technician.1@shtaskmapp.com');

                        expect(decoded)
                            .have.property('role')
                            .and.to.equal('TECHNICIAN');

                        done();
                    });
                });
        });

    });
});