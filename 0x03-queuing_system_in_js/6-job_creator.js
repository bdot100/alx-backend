const kue = require('kue');
const queue = kue.createQueue();

// Define the job data
const jobData = {
  phoneNumber: '4153518780', // Replace with the phone number
  message: 'This is the code to verify your account', // Replace with the message
};

// Create a job and add it to the queue
const job = queue.create('push_notification_code', jobData);

// Handle job creation success
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
});

// Handle job completion
job.on('complete', () => {
  console.log('Notification job completed');
  process.exit(0); // Exit the script after completion
});

// Handle job failure
job.on('failed', (errorMessage) => {
  console.error(`Notification job failed: ${errorMessage}`);
  process.exit(1); // Exit the script with an error code
});

// Save the job to the queue
job.save((err) => {
  if (err) {
    console.error(`Error creating job: ${err}`);
    process.exit(1); // Exit the script with an error code
  }
});
