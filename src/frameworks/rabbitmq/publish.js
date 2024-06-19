import { getChannel } from './rabbitmq.js';

const publishAppointmentCreated = async (appointmentData) => {
  const channel = getChannel();
  if (!channel) {
    console.error('Cannot publish appointment created, channel is not available');
    return;
  }

  console.log('Asserting appointment_created queue');
  await channel.assertQueue('appointment_created', { durable: true });

  console.log('Publishing appointment created message');
  channel.sendToQueue('appointment_created', Buffer.from(JSON.stringify(appointmentData)));
};

export { publishAppointmentCreated };
