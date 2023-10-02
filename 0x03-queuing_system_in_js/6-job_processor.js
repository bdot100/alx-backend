const kue = require('kue');
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs from the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with job data
  sendNotification(phoneNumber, message);

  // Mark the job as completed
  done();
});

// Handle queue errors
queue.on('error', (err) => {
  console.error(`Queue error: ${err}`);
  process.exit(1); // Exit the script with an error code
});

console.log('Job processor is listening for new jobs...');
