import {expect, sinon} from "../test.js";
import {createTask} from "../../src/services/taskService.js";
import mailer from "../../src/helpers/mailer.js";
import {getManagersEmails} from "../../src/repositories/userRepository.js";

describe('Task service', () => {

    describe('Create', () => {
        const sandbox = sinon.createSandbox();

        afterEach(function () {
            sandbox.restore();
        });

        it('Should notify managers with obfuscate personal information', (done) => {
            sinon.stub(mailer, 'asyncSendMail').callsFake((subject, body, to) => {
                try {
                    expect(body).to.contain.oneOf(['summary', '*****'])
                        .and.not.contain.oneOf(['private', 'personal', 'information']);

                    const emails = getManagersEmails();
                    expect(emails).to.eventually.have.all.members(to)
                        .notify(done);
                } catch (e) {
                    done(e);
                }
            });

            createTask({
                summary: 'summary <private>personal information</private>',
                date: '2023-09-16',
                email: 'technician.2@shtaskmapp.com'
            });
        });

    });
});