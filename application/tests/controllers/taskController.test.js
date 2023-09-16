import {chai, app, expect} from '../test.js';
import {generateToken} from "../../src/helpers/authorizationToken.js";
import {fetchTaskByUid, fetchTasks} from "../../src/repositories/taskRepository.js";

describe('Task controller', () => {

    describe('List', () => {

        it('Should require token', (done) => {
            chai.request(app)
                .get('/tasks')
                .send({})
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(401);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.equal('Token not found');

                    done();
                });
        });

        it('Should validate user not found', (done) => {
            const token = generateToken({email: 'doesntexist@shtaskmapp.com', role: 'MANAGER'});

            chai.request(app)
                .get('/tasks')
                .send({})
                .set('authorization', token)
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(500);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.equal('Internal error');

                    done();
                });
        });

        describe('Manager role', () => {
            const token = generateToken({email: 'manager@shtaskmapp.com', role: 'MANAGER'});

            it('Should see all tasks', (done) => {
                chai.request(app)
                    .get('/tasks')
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(200);

                        expect(res.body).be.a('array');

                        expect(fetchTasks().then((tasks) => tasks.length))
                            .to.eventually.be.equal(res.body.length)
                            .notify(done);
                    });
            });
        });

        describe('Technician role', () => {
            const tokenInfo = {email: 'technician.2@shtaskmapp.com', role: 'TECHNICIAN'};
            const token = generateToken(tokenInfo);

            it('Should see only own tasks', (done) => {
                chai.request(app)
                    .get('/tasks')
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(200);

                        expect(res.body).be.a('array');

                        expect(fetchTasks(tokenInfo.email).then((tasks) => tasks.length))
                            .to.eventually.be.equal(res.body.length)
                            .notify(done);
                    });
            });
        });

    });

    describe('Create', () => {

        it('Should require token', (done) => {
            chai.request(app)
                .post('/tasks')
                .send({})
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(401);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.equal('Token not found');

                    done();
                });
        });

        it('Should validate user not found', (done) => {
            const token = generateToken({email: 'doesntexist@shtaskmapp.com', role: 'TECHNICIAN'});

            chai.request(app)
                .post('/tasks')
                .send({summary: "summary", date: "2023-09-16"})
                .set('authorization', token)
                .end((err, res) => {
                    expect(err).to.be.null;

                    expect(res).have.status(500);

                    expect(res.body)
                        .be.a('object')
                        .and.have.property('message')
                        .and.to.be.a('string')
                        .and.equal('Internal error');

                    done();
                });
        });

        describe('Manager role', () => {
            const token = generateToken({email: 'manager@shtaskmapp.com', role: 'MANAGER'});

            it('Should not allow creating a new task', (done) => {
                chai.request(app)
                    .post('/tasks')
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(403);

                        expect(res.body)
                            .be.a('object')
                            .and.have.property('message')
                            .and.to.be.a('string')
                            .and.equal('Forbidden');

                        done();
                    });
            });

        });

        describe('Technician role', () => {
            const tokenInfo = {email: 'technician.1@shtaskmapp.com', role: 'TECHNICIAN'};
            const token = generateToken(tokenInfo);

            it('Should create a new task', (done) => {
                const payload = {summary: "test", date: "2023-09-15"};

                chai.request(app)
                    .post('/tasks')
                    .set('authorization', token)
                    .send(payload)
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(200);

                        expect(res.body)
                            .be.a('object')
                            .and.have.property('id')
                            .and.to.be.a('string')
                            .and.is.not.empty;

                        expect(res.body.summary).to.be.equal(payload.summary);

                        expect(res.body.date).to.be.equal(payload.date);

                        expect(res.body.technician).to.be.equal(tokenInfo.email);

                        expect(fetchTaskByUid(res.body.id))
                            .to.eventually.not.be.null
                            .notify(done);
                    });
            });

            it('Should require summary', (done) => {
                chai.request(app)
                    .post('/tasks')
                    .set('authorization', token)
                    .send({})
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(400);

                        expect(res.body)
                            .be.a('object')
                            .and.have.property('message')
                            .and.to.be.a('string')
                            .and.to.equal('"summary" is required');

                        done();
                    });
            });

            it('Should validate summary length', (done) => {
                chai.request(app)
                    .post('/tasks')
                    .set('authorization', token)
                    .send({summary: "summary".repeat(360)})
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(400);

                        expect(res.body)
                            .be.a('object')
                            .and.have.property('message')
                            .and.to.be.a('string')
                            .and.to.equal('"summary" length must be less than or equal to 2500 characters long');

                        done();
                    });
            });

            it('Should require date', (done) => {
                chai.request(app)
                    .post('/tasks')
                    .set('authorization', token)
                    .send({summary: "summary"})
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(400);

                        expect(res.body)
                            .be.a('object')
                            .and.have.property('message')
                            .and.to.be.a('string')
                            .and.to.equal('"date" is required');

                        done();
                    });
            });

            it('Should validate date', (done) => {
                chai.request(app)
                    .post('/tasks')
                    .set('authorization', token)
                    .send({summary: "summary", date: "not-a-date"})
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(400);

                        expect(res.body)
                            .be.a('object')
                            .and.have.property('message')
                            .and.to.be.a('string')
                            .and.to.equal('"date" must be a valid date');

                        done();
                    });
            });
        });

    });
});