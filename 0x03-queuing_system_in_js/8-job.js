function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
      throw new Error('Jobs is not an array');
    }
  
    jobs.forEach((jobData) => {
      let job = queue.create('push_notification_code_3', jobData);
  
      job.on('complete', function() {
        console.log(`Notification job ${job.id} completed`);
      }).on('failed', function(error) {
        console.log(`Notification job ${job.id} failed: ${error}`);
      }).on('progress', function(progress, data) {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
      job.save((error) => {
        if (!error) console.log(`Notification job created: ${job.id}`);
      });
    });
  }
  
  module.exports = createPushNotificationsJobs;
  