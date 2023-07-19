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
  };
}
