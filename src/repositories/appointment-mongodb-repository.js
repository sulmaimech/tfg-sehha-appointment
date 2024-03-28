//import Appointment mongoose model
import mongoose from "mongoose";
import Appointment from "./models/AppointmentModel.js";
import Speciality from "./models/SpecialityModel.js";
import User from "./models/UserModel.js";
import Specialist from "./models/SpecialistModel.js";
import Schedule from "./models/ScheduleModel.js";
import ScheduleSlot from "./models/ScheduleSlotModel.js";
import APIFeatures from "../utils/apiFeature.js";

//TODO: implement the makeMongodbRepository
// Return a repository that has the following methods:
// create appointment method being the code of the model the following

export default function makeMongodbRepository() {
  return {
    // specialiy operations
    addSpeciality: async ({ name, description }) => {
      try {
        if (!name || !description) {
          throw new Error("Missing required speciality information");
        }
        const response = await Speciality.create( {name, description});
        if (!response) {
          throw new Error("Failed to create the speciality");
        }
        const specialityResponse = { id: response._doc._id, name: response._doc.name, description: response._doc.description, createdAt: response._doc.createdAt, updatedAt: response._doc.updatedAt };
        return specialityResponse;
      } catch (error) {
        throw new Error("Error while adding a speciality: " + error.message);
      }
    },    
    listAllSpecialities: async () => {
      try {
        const specialities = await Speciality.find();
        // Check if the result is indeed an array as expected
        if (!Array.isArray(specialities)) {
          throw new Error("Unexpected response type from the database");
        }
        // Proceed as normal if it is an array (even if empty)
        return specialities.map(s => {
          const speciality = { id: s._doc._id, ...s._doc };
          return speciality;
        });
      } catch (error) {
        // Handle actual failures or unexpected response types
        throw new Error("Error while listing all specialities: " + error.message);
      }
    },
     
    removeSpeciality: async ({ id }) => {
      try {
        const deletedSpeciality = await Speciality.findByIdAndDelete(id);
        if (!deletedSpeciality) {
          throw new Error("Failed to remove the speciality");
        }
        return { id: deletedSpeciality._doc._id, ...deletedSpeciality._doc };
      } catch (error) {
        throw new Error("Error while removing a speciality: " + error.message);
      }
    },
    
    getSpecialityDetails: async ({ id }) => {
      try{
                let speciality = await Speciality.findById(id);
        // throw error if nothing is retrieved
        if (!speciality) {
          throw new Error("Speciality not found");
        }
        speciality = speciality._doc
        return { id: speciality._id, name: speciality.name, description: speciality.description };
      } catch (error) {
        throw new Error("Error while creating a speciality: " + error.message);
      }
    },
    updateSpeciality: async ({ id, name, description }) => {
      try {
        if (!name && !description) {
          throw new Error("No update information provided");
        }
        const updatedSpeciality = await Speciality.findByIdAndUpdate(id, {name, description}, { new: true });
        if (!updatedSpeciality) {
          throw new Error("Failed to update the speciality");
        }
        console.log("Updated Speciality: ", updatedSpeciality);
        return updatedSpeciality;
      } catch (error) {
        throw new Error("Error while updating a speciality: " + error.message);
      }
    },
    
    // User operations
    retrieveUserById: async ({ id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          appointments: user.appointments
        };
      } catch (error) {
        throw new Error("Error while retrieving a User: " + error.message);
      }
    },    
    updateUser: async ({ id, userInfo }) => {
      try {
        console.log("UserInfo @updateUser: ", userInfo)
        // Ensure 'userInfo' is correctly structured as per your schema requirements
        const updatedUser = await User.findByIdAndUpdate(id, userInfo, { new: true }); // 'new: true' to return the updated document
        console.log("Updated User: ", updatedUser);
        return updatedUser; // Return the updated document
      } catch (error) {
        console.error("Error while updating a User", error);
        return null; // Return null or an appropriate error indication
      }
    },

    // Specialists operations
    retrieveAllSpecialists: async () => {
      try {
        const specialists = await Specialist.find({})
          .populate({
            path: 'specialities', 
          }) 
          .populate(
            {
              path: 'schedule', 
              select: '-specialist',
              populate: {
                path: 'slots', 
                populate: {
                  path: 'appointment',
                  select: '-specialist', 
                  populate: {
                    path: 'user', 
                    select: '-slot -specialist'
                  }
                }
              }
            }
          )
          .exec(); // Ensures the operation returns a promise

          console.log(specialists)
    
        return specialists.map(s => {
          const specialist = {
            id: s._doc._id,
            firstName: s._doc.firstName,
            lastName: s._doc.lastName,
            specialities: s._doc.specialities,
            schedule: s._doc.schedule,
            email: s._doc.contactInfo.email,
            phone: s._doc.contactInfo.phone
          };
          console.log("Specialist: ", specialist);
          return specialist;
        });
      } catch (error) {
        // Throws an error which can be caught and handled by the caller
        throw new Error(`Error while retrieving all Specialists: ${error.message}`);
      }
    },    
    retrieveSpecialistById: async ({ id }) => {
      try {
        const specialist = await Specialist.findById(id)
          .populate('specialities') // Populates the specialities field
          .exec(); // Ensures the operation returns a promise
    
        if (!specialist) {
          throw new Error("Specialist not found");
        }
    
        console.log("Specialist: ", specialist);
    
        return {
          id: specialist._id,
          firstName: specialist.firstName,
          lastName: specialist.lastName,
          specialities: specialist.specialities,
          email: specialist.contactInfo.email,
          phone: specialist.contactInfo.phone
        };
      } catch (error) {
        // Throws an error which can be caught and handled by the caller
        throw new Error(`Error while retrieving a Specialist by ID (${id}): ${error.message}`);
      }
    },    
    // Schedule Operations
    getSpecialistSchedule: async ({ id, query }) => {
      try {

        const features = new APIFeatures(Schedule.findOne({ specialist: id })
        .populate({
          path: 'specialist',
          populate: {
            path: 'specialities',
          },
        })
        .populate({
          path: 'slots',
          model: 'ScheduleSlot',
          strictPopulate: false,
          populate: {
            path: 'appointment',
            strictPopulate: false,
            populate: ['user', 'specialist', 'speciality'], // Populate further details of the appointment if needed
          },
        }), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

        const schedule =  await features.query;

        console.log("Schedule @getSpecialistSchedule: ", schedule)

        console.log("Appointments: ", schedule[0].slots.map(slot => slot.appointment))
        return {
          id: schedule[0]._id,
          specialist: {
            id: schedule[0].specialist._id,
            firstName: schedule[0].specialist.firstName,
            lastName: schedule[0].specialist.lastName,
            email: schedule[0].specialist.contactInfo.email,
            phone: schedule[0].specialist.contactInfo.phone,
            specialities: schedule[0].specialist.specialities,
          },
          slots: schedule[0].slots.map(slot => {
            return {
              slotId: slot._id,
              startTime: slot.startTime,
              endTime: slot.endTime,
              appointment: slot.appointment,
            };
          }
          ),
        };
      }
      catch (error) {
        console.log("Error while retrieving a Specialist Schedule", error);
      }
    }
    ,
    addNewTimeSlots: async ({ specialistId, slots }) => {
      try {
        console.log("id: ", specialistId)
        const schedule = await Schedule.findOne({ specialist: specialistId })
          .populate({
            path: 'specialist',
            populate: {
              path: 'specialities',
            },
          })
          .populate({
            path: 'slots',
            model: 'ScheduleSlot',
            strictPopulate: false,
            populate: {
              path: 'appointment',
              strictPopulate: false,
              populate: ['user', 'specialist', 'speciality'], // Populate further details of the appointment if needed
            },
          })
          .exec();

        console.log("Schedule @addNewTimeSlots: ", schedule);

        // Check for overlapping slots
        const overlaps = await Promise.all(slots.map(async (slot) => {
          const overlappingSlot = await ScheduleSlot.findOne({
            $and: [
              { endTime: { $gt: slot.startTime } },
              { startTime: { $lt: slot.endTime } },
            ],
          });
          return overlappingSlot ? true : false;
        }));

        // If any slot overlaps, throw an error or handle it as needed
        if (overlaps.some(isOverlap => isOverlap)) {
          throw new Error("One or more slots overlap with existing slots.");
        }

        // If no overlaps, proceed to create and save new slots
        const newSlotDocs = await Promise.all(slots.map(async (slot) => {
          const newSlot = new ScheduleSlot({
            startTime: slot.startTime,
            endTime: slot.endTime,
            appointment: null,
          });
          await newSlot.save();
          return newSlot;
        }));
        console.log("New slot docs: ", newSlotDocs);
        // Add the new slot IDs to the schedule's slots array
        const newSlotIds = newSlotDocs.map(slotDoc => slotDoc._id);
        schedule.slots.push(...newSlotIds);

        // Save the updated schedule document
        await schedule.save();

        // Populate the slots of the existing document
        await schedule.populate({
          path: 'slots',
          model: 'ScheduleSlot',
          // Optionally, add more populate options here
        });

        console.log("Schedule @ end: ", schedule)

        return {
          id: schedule._id,
          specialist: {
            id: schedule.specialist._id,
            firstName: schedule.specialist.firstName,
            lastName: schedule.specialist.lastName,
            email: schedule.specialist.contactInfo.email,
            phone: schedule.specialist.contactInfo.phone,
            specialities: schedule.specialist.specialities,
          },
          slots: schedule.slots.map(slot => {
            return {
              slotId: slot._id,
              startTime: slot.startTime,
              endTime: slot.endTime,
              appointment: slot.appointment,
            };
          }
          ),
        };
      } catch (error) {
        console.log("Error while adding new time slots", error);
        // Handle the error appropriately
      }
    }
    ,
    removeTimeSlot: async ({ specialistId, slotId }) => {
      console.log("id: ", specialistId)
      console.log("slotId: ", slotId)
      try {
        // Find the schedule and pull the slotId from its slots array
        const schedule = await Schedule.findOneAndUpdate(
          { specialist: specialistId },
          { $pull: { slots: slotId } },
          { new: true }
        ).exec();

        if (!schedule) {
          throw new Error('Schedule not found');
        }

        // Delete the specified slot
        await ScheduleSlot.findByIdAndDelete(slotId);

        console.log(`Slot ${slotId} removed successfully from specialist ${specialistId}'s schedule.`);
        return { message: `Slot ${slotId} removed successfully.` };
      } catch (error) {
        console.log("Error while removing time slot", error);
        throw error;
      }
    },
    updateSlot: async ({ specialistId, slotId, startTime, endTime }) => {
      try {
        console.log("id: ", specialistId)
        console.log("slotId: ", slotId)
        console.log("startTime: ", startTime)
        console.log("endTime: ", endTime)

        // Find and update the slot
        const updatedSlot = await ScheduleSlot.findByIdAndUpdate(
          slotId,
          { startTime, endTime },
          { new: true, runValidators: true }
        ).exec();

        if (!updatedSlot) {
          throw new Error('Slot not found');
        }

        console.log(`Slot ${slotId} updated successfully.`);
        console.log("This is the slot: ", updatedSlot)

        return null
      } catch (error) {
        console.log("Error while updating slot", error);
        throw error; // It's good practice to re-throw the error or handle it appropriately
      }
    },

    // Appointment operations
    createAppointment: async ({userId, specialistId, specialityId, slotId }) => {
      try {
       const appointment=  await Appointment.create({ 
          user: userId, 
          specialist:specialistId, 
          status: "scheduled", 
          speciality: specialityId, 
          slot: slotId });
        return {id: appointment._id, user};
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    },
    cancelAppointment: async ({id}) => {
      try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status: "cancelled" }, { new: true });
        return appointment;
      } catch (error) {
        console.log("Error while canceling appointment", error);
      }
    } ,
    updateAppointment: async ({id, status}) => {
      try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
        return appointment;
      } catch (error) {
        console.log("Error while updating appointment", error);
      }
    }  ,
    retrieveAppointmentById: async ({ id }) => {
      try {
        const appointment = await Appointment.findById(id);
        return appointment;
        } catch (error) {
        console.log("Error while retrieving a User", error);
      }
    }
    ,
    listAllAppointments: async (query) => {
      try {
        // use API Feature
        const features = new APIFeatures(Appointment.find()
        .populate('user speciality slot')
        .populate({
          path: 'specialist',
          populate: {
            path: 'specialities',
            model: 'Speciality' // Ensure this matches the name of your Speciality model
          }
        }), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        const appointments = await features.query;
        console.log("Appointments: ", appointments);
        return appointments.map(appointment => {
          console.log("Appointment: ", appointment);
          console.log("Slot: ", appointment.slot);
          console.log("User: ", appointment.user);
          console.log("Specialist: ", appointment.specialist);
          console.log("Speciality: ", appointment.specialities);
          console.log("Join Url: ", appointment.joinUrl);
          console.log("Status: ", appointment.status);
          console.log("Id: ", appointment.slot._id.toString());

          return  {
            id: appointment.slot._id.toString(),
            startTime: appointment.slot.startTime,
            endTime: appointment.slot.endTime,
            appointment: {
              id: appointment._id.toString(),
              status: appointment.status,
              user: {
                id: appointment.user._id.toString(),
                firstName: appointment.user.firstName,
                lastName: appointment.user.lastName,
                dateOfBirth: appointment.user.dateOfBirth.toISOString().split('T')[0],
                gender: appointment.user.gender,
                email: appointment.user.email,
                phone: appointment.user.phone,
              },
              specialist: {
                id: appointment.specialist._id.toString(),
                firstName: appointment.specialist.firstName,
                lastName: appointment.specialist.lastName,
                email: appointment.specialist.contactInfo.email, // Assuming contactInfo is populated correctly
                phone: appointment.specialist.contactInfo.phone,
                specialities: appointment.specialist.specialities.map(speciality => {
                  // Placeholder for speciality transformation; adjust as needed
                  return {
                    id: speciality._id.toString(),
                    name: speciality.name, // You need to adjust this
                    description: speciality.description // And this
                  };
                }),
              },
              speciality: {
                id: appointment.speciality._id.toString(), // You need to adjust this
                name: appointment.speciality.name, // You need to adjust this
                description: appointment.speciality.description // And this
              },
              joinUrl: appointment.joinUrl,
            }
          };
        });
      } catch (error) {
        console.log("Error while retrieving appointments", error);
      }
    }
  }    
}
