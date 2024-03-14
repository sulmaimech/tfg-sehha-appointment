//import Appointment mongoose model
import mongoose from "mongoose";
import Appointment from "./models/AppointmentModel.js";
import Speciality from "./models/SpecialityModel.js";
import User from "./models/UserModel.js";
import Specialist from "./models/SpecialistModel.js";
import Schedule from "./models/ScheduleModel.js";
import ScheduleSlot from "./models/ScheduleSlotModel.js";

//TODO: implement the makeMongodbRepository
// Return a repository that has the following methods:
// create appointment method being the code of the model the following

export default function makeMongodbRepository() {
  return {
    // specialiy operations
    addSpeciality: async ({specialityInfo}) => {
      try {
        console.log("SpecialityInfo @addSpeciality: ", specialityInfo) 
        const speciality = {
          name: specialityInfo.name,
          description: specialityInfo.description,
        } 
        const { _doc } = await Speciality.create(speciality);
        console.log("Speciality @addSpeciality: ", _doc)
        const specialityResponse = { id: _doc._id, ..._doc };
        console.log("SpecialityResponse @addSpeciality: ", specialityResponse)
        return specialityResponse;
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    },
    listAllSpecialities: async () => {

      try {
        const specialities = await Speciality.find();
        return specialities.map( s => {
          const speciality =  { id: s._doc._id, ...s._doc }
          console.log("Speciality: ", speciality)
          return speciality
        });
      } catch (error) {
        console.log("Error while creating appointment", error);
      }

    },
    removeSpeciality: async ({id}) => {
      try {
        const { _doc } = await Speciality.findByIdAndDelete(id);
        console.log("Removed Speciality: ", speciality)
        return { id: _doc._id, ..._doc };
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    } 
    ,
    getSpecialityDetails: async ({id} ) => {
      try {
        const { _doc } = await Speciality.findById(id);
        return  { id: _doc._id, ..._doc };
      } catch (error) {
        console.log("Error while retrieving a Speciality", error);
      }
    }, 
    updateSpeciality: async ({id, specialityInfo}) => {
      try {
        console.log("SpecialityInfo @updateSpeciality: ", specialityInfo)
        // Ensure 'specialityInfo' is correctly structured as per your schema requirements
        const updatedSpeciality = await Speciality.findByIdAndUpdate(id, specialityInfo, { new: true }); // 'new: true' to return the updated document
        console.log("Updated Speciality: ", updatedSpeciality);
        return updatedSpeciality; // Return the updated document
      } catch (error) {
        console.error("Error while updating a Speciality", error);
        return null; // Return null or an appropriate error indication
      }
    },
    // User operations
    retrieveUserById: async ({id}) => {
      try {
        console.log("id @retrieveIdByUser @appointmentReposiotory: ", id)
        const { _doc } = await User.findById(id);
        console.log("User: ", _doc)
        return  { id: _doc._id, ..._doc };
      } catch (error) {
        console.log("Error while retrieving a User", error);
      }
    }
    ,
    updateUser: async ({id, userInfo}) => {
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
        .populate('specialities') // This will replace the specialities ObjectId with the actual Speciality documents
        .exec(); // exec() returns a Promise, making it awaitable
      ;
        return specialists.map( s => {
          const specialist =  { 
            id: s._doc._id,
            firstName: s._doc.firstName,
            lastName: s._doc.lastName,
            specialities: s._doc.specialities,
            email: s._doc.contactInfo.email,
            phone: s._doc.contactInfo.phone
            }
          console.log("Specialist: ", specialist)
          return specialist
        });
      } catch (error) {
        console.log("Error while retrieving all Specialists", error);
      }
    },
    retrieveSpecialistById: async ({id}) => {
      try {
        const { _doc } = await Specialist.findById(id)
        .populate('specialities') // This will replace the specialities ObjectId with the actual Speciality documents
        .exec(); // exec() returns a Promise, making it awaitable

        console.log("Specialist: ", _doc)
        
        return   { 
          id: _doc._id,
          firstName: _doc.firstName,
          lastName: _doc.lastName,
          specialities: _doc.specialities,
          email: _doc.contactInfo.email,
          phone: _doc.contactInfo.phone
          };
      } catch (error) {
        console.log("Error while retrieving a Specialist", error);
      }
    },

    // Schedule Operations
    getSpecialistSchedule: async ({id}) => {
      try {
        const schedule = await Schedule.findOne({specialist: id})
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

        console.log("Schedule @getSpecialistSchedule: ", schedule)
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
      }
      catch (error) {
        console.log("Error while retrieving a Specialist Schedule", error);
      }
    }
    ,
    addNewTimeSlots: async ({ specialistId, slots }) => {
      try {
        console.log("id: ", specialistId)
        const schedule = await Schedule.findOne({specialist: specialistId})
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
    createAppointment: async ({appointmentInfo}) => {
      try {
        const { _doc } = await Appointment.create(appointmentInfo);
        return { id: _doc._id, ..._doc };
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    },
    listAllAppointments: async () => {
      try {
        const appointments = await Appointment.find();
        return appointments.map( a => {
          const appointment =  { id: a._doc._id, ...a._doc }
          console.log("Appointment: ", appointment)
          return appointment
        });
      } catch (error) {
        console.log("Error while creating appointment", error);
      }
    }
  }
}
