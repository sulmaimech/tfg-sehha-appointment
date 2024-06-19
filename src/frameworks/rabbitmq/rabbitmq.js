const CLOUDAMQP_URL = process.env.CLOUDAMQP_URL;

let channel = null;

const connectRabbitMQ = (callback) => {
  import('amqplib/callback_api.js').then(amqp => {
    console.log('amqplib module loaded successfully');
    amqp.connect(CLOUDAMQP_URL, (err, conn) => {
      if (err) {
        console.error('Failed to connect to RabbitMQ:', err);
        process.exit(1);
      }
      console.log('Connected to RabbitMQ');
      conn.createChannel((err, ch) => {
        if (err) {
          console.error('Failed to create channel:', err);
          process.exit(1);
        }
        channel = ch;
        console.log('Channel created successfully');
        callback();
      });
    });
  }).catch(error => {
    console.error('Failed to load amqplib:', error);
    process.exit(1);
  });
};

const getChannel = () => {
  if (channel) {
    console.log('Returning existing channel');
  } else {
    console.error('Channel is not yet created');
  }
  return channel;
};

export { connectRabbitMQ, getChannel };
