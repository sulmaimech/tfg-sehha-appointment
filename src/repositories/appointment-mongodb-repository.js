//import Appointment mongoose model
import Appointment from "./models/AppointmentModel.js";
import Speciality from "./models/SpecialityModel.js";

//TODO: implement the makeMongodbRepository
// Return a repository that has the following methods:
// create appointment method being the code of the model the following

export default function makeMongodbRepository() {
  return {
    addSpeciality: async ({specialityInfo}) => {
      try {
        const speciality = {
          name: specialityInfo.name,
          description: specialityInfo.description,
        } 
        const { _doc } = await Speciality.create({speciality});

        return { id: _doc._id, ..._doc };
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    },
    findSpecialityById: async ({id} ) => {
      try {
        const speciality = await Speciality.findById(id);
        return speciality;
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    
    }, 
    
  }
}

    // create: async ({
    //   date,
    //   duration,
    //   visitType,
    //   visitReason,
    //   status,
    //   patient,
    //   professional,
    //   videoAppointment,
    // }) => {
    //   try {
    //     const { _doc } = await Appointment.create({
    //       date,
    //       duration,
    //       visitType,
    //       visitReason,
    //       status,
    //       patient,
    //       professional,
    //       videoAppointment,
    //     });

    //     return { id: _doc._id, ..._doc };
    //   } catch (error) {
    //     console.log("Error while creating appointment", error);
    //   }


