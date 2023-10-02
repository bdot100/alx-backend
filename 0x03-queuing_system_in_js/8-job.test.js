import kue from 'kue';

import createPushNotificationsJobs from './8-job.js';

const queue = kue.createQueue();

import { expect } from 'chai';


describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Create a Kue queue in test mode
    queue = kue.createQueue({ redis: { port: 6379, host: '127.0.0.1' }, disableSearch: true });
    queue.testMode.enter();
  });

  after(() => {
    // Clear the queue and exit test mode
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should create jobs in the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Check the number of jobs in the queue
    expect(queue.testMode.jobs.length).to.equal(2);

    // Check the type of the first job in the queue
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');

    // Check the job data of the first job in the queue
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
  });

  it('should throw an error if jobs is not an array', () => {
    const invalidJobs = 'This is not an array';

    expect(() => createPushNotificationsJobs(invalidJobs, queue)).to.throw('Jobs is not an array');
  });
});
