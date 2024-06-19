import { connectRabbitMQ, getChannel } from './rabbitmq.js';
import { createUser, createSpecialist } from '../../use-cases/index.js'; // Adjust the import path as needed

const consumeUserQueue = () => {
  const channel = getChannel();
  if (!channel) {
    console.error('Cannot consume user queue, channel is not available');
    return;
  }

  console.log('Asserting user queue');
  channel.assertQueue('user_created', { durable: true });

  console.log('Starting to consume user queue');
  channel.consume('user_created', async (msg) => {
    if (msg !== null) {
      const userData = JSON.parse(msg.content.toString());
      console.log('Received message from user queue:', userData);
      try {
        await createUser(userData);
        console.log('User created successfully:', userData);
        channel.ack(msg);
      } catch (error) {
        console.error('Failed to create user:', error);
      }
    }
  });
};

const consumeSpecialistQueue = () => {
  const channel = getChannel();
  if (!channel) {
    console.error('Cannot consume specialist queue, channel is not available');
    return;
  }

  console.log('Asserting specialist queue');
  channel.assertQueue('specialist_created', { durable: true });

  console.log('Starting to consume specialist queue');
  channel.consume('specialist_created', async (msg) => {
    if (msg !== null) {
      const specialistData = JSON.parse(msg.content.toString());
      console.log('Received message from specialist queue:', specialistData);
      try {
        await createSpecialist(specialistData);
        console.log('Specialist created successfully:', specialistData);
        channel.ack(msg);
      } catch (error) {
        console.error('Failed to create specialist:', error);
      }

    }
  });
};

const startConsumers = () => {
  connectRabbitMQ(() => {
    consumeUserQueue();
    consumeSpecialistQueue(); 
    console.log('Consumers started');
  });
};

export { startConsumers };
