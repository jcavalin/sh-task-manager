import {chai, app, expect} from '../test.js';
import {generateToken} from "../../src/helpers/authorizationToken.js";
import {fetchTasks} from "../../src/repositories/taskRepository.js";

describe('Task', () => {

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

        describe('Manager role', () => {
            const token = generateToken({role: 'MANAGER'});

            it('Should see all tasks', (done) => {
                chai.request(app)
                    .get('/tasks')
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(err).to.be.null;

                        expect(res).have.status(200);

                        expect(res.body)
                            .be.a('array');

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

                        expect(res.body)
                            .be.a('array');

                        expect(fetchTasks(tokenInfo.email).then((tasks) => tasks.length))
                            .to.eventually.be.equal(res.body.length)
                            .notify(done);
                    });
            });
        });

    });
});