//import Appointment mongoose model
import Appointment from "./models/AppointmentModel.js";
//TODO: implement the makeMongodbRepository
// Return a repository that has the following methods:
// create appointment method being the code of the model the following

export default function makeMongodbRepository() {
  return {
    create: async ({
      date,
      duration,
      visitType,
      visitReason,
      status,
      patient,
      professional,
      videoAppointment,
    }) => {
      try {
        const { _doc } = await Appointment.create({
          date,
          duration,
          visitType,
          visitReason,
          status,
          patient,
          professional,
          videoAppointment,
        });

        return { id: _doc._id, ..._doc };
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    },
    cancel: async (appointmentId) => {
      try {
        const appointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          {
            status: "cancelled",
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return appointment;
      } catch (error) {
        console.log(
          `Error while cancelling appointment with ID ${appointmentId}`,
          error
        );
      }
    },
    edit: async (appointmentId, appointmentFields) => {
      try {
        const appointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          appointmentFields,
          {
            new: true,
            runValidators: true,
          }
        );
        return appointment;
      } catch (error) {
        console.log(
          `Error while editing appointment with ID ${appointmentId}`,
          error
        );
      }
    },
    listById: async (appointmentId) => {
      try {
        const appointment = await Appointment.findById(appointmentId);
        return appointment;
      } catch (error) {
        console.log(
          `Error while listing appointment with ID ${appointmentId}`,
          error
        );
      }
    },
    listByFilter: async () => {
      try {
        const appointments = await Appointment.find();
        return appointments;
      } catch (error) {
        console.log(`Error while listing appointments with filter `, error);
      }
    },
  };
}
