import Appointment from "./models/AppointmentModel.js";
import Speciality from "./models/SpecialityModel.js";
import User from "./models/UserModel.js";
import Specialist from "./models/SpecialistModel.js";
import Schedule from "./models/ScheduleModel.js";
import ScheduleSlot from "./models/ScheduleSlotModel.js";
import APIFeatures from "../utils/apiFeature.js";
import { createUser } from "../use-cases/index.js";

export default function makeMongodbRepository() {
  return {
    // specialiy operations
    addSpeciality: async ({ name, description }) => {
      try {
        if (!name || !description) {
          throw new Error("Missing required speciality information");
        }
        const response = await Speciality.create({ name, description });
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
      try {
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
        const updatedSpeciality = await Speciality.findByIdAndUpdate(id, { name, description }, { new: true });
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
    retrieveAllUsers: async ({ query }) => {
      try {
        // Use APIFeatures to use the filters, sort, pagination, etc
        const features = new APIFeatures(User.find(), query, [])
        // .filter()
        // .sort()
        // .limitFields()
        // .paginate();
        console.log(features)

        const users = await features.execWithPopulatedSort()

        console.log("Users: ", users)
        // Check if the result is indeed an array as expected
        // Check if the result is indeed an array as expected
        if (!Array.isArray(users)) {
          throw new Error("Unexpected response type from the database");
        }
        // Proceed as normal if it is an array (even if empty)
        return users.map(u => {
          const user = {
            id: u._id,
            firstName: u.firstName,
            lastName: u.lastName,
            dateOfBirth: u.dateOfBirth,
            email: u.email,
            phone: u.phone,
            gender: u.gender
          };
          return user;
        });
      }
      catch (error) {
        // Throws an error which can be caught and handled by the caller
        throw new Error("Error while retrieving all Users: " + error.message);
      }
    }
    ,
    createUser: async ({ id, firstName, lastName, dateOfBirth, gender, email, phone }) => {
      try {
        const user = {
          _id: id,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          email,
          phone
        };
        console.log("Create ucser: ", user)
        const newUser = await User.create(user);
        console.log("New User: ", newUser);
        return newUser;
      } catch (error) {
        throw new Error("Error while creating a User: " + error.message);
      }
    }
    ,


    // Specialists operations
    retrieveAllSpecialists: async ({ query }) => {
      try {

        // Use APIFeatures to use the filters, sort, pagination, etc
        const features = new APIFeatures(Specialist.find({})
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
          ), query)
          .filter()
          .sort()
          .limitFields()
          .paginate();
        const specialists = await features.query;

        // Check if the result is indeed an array as expected
        console.log("Specialists: ", specialists)

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

getSpecialistSchedule: async ({ id, query }) => {
  try {
    // Fetch the schedule and populate the specialist field
    let schedule = await Schedule.findOne({ specialist: id })
      .populate({
        path: 'specialist',
        select: '-schedule',
        populate: {
          path: 'specialities',
        },
      })
      .exec();

    // Log the initial schedule with populated specialist
    console.log("Initial schedule with populated specialist:", schedule);

    if (!schedule) {
      console.log("No schedule found for the provided ID.");
      return null; // or appropriate response indicating no schedule found
    }

    // Use API Features for further processing if needed
    const features = new APIFeatures(
      Schedule.findOne({ specialist: id })
        .populate({
          path: 'specialist',
          select: '-schedule',
          populate: {
            path: 'specialities',
          },
        })
        .populate({
          path: 'slots',
          populate: {
            path: 'appointment',
            select: '-slot',
            populate: [
              {
                path: 'user',
                select: '-appointments'
              },
              {
                path: 'speciality'
              },
              {
                path: 'specialist',
                select: '-schedule',
                populate: {
                  path: 'specialities',
                }
              },
            ]
          }
        }),
      query
    )
    .filter()
    .sort()
    .limitFields()
    .paginate();

    schedule = await features.execWithPopulatedSort();
    schedule = schedule[0];

    if (!schedule) {
      console.log("No populated schedule found.");
      return null;
    }

    console.log("Populated Schedule: ", schedule);

    // Process and return the structured schedule data
    return {
      id: schedule._id,
      specialist: schedule.specialist ? {
        id: schedule.specialist._id,
        firstName: schedule.specialist.firstName,
        lastName: schedule.specialist.lastName,
        specialities: schedule.specialist.specialities ? schedule.specialist.specialities.map(speciality => ({
          id: speciality._id,
          name: speciality.name,
          description: speciality.description
        })) : [],
        email: schedule.specialist.contactInfo.email,
        phone: schedule.specialist.contactInfo.phone
      } : null,
      slots: schedule.slots ? schedule.slots.map(slot => ({
        slotId: slot._id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        appointment: slot.appointment ? {
          id: slot.appointment._id,
          user: slot.appointment.user ? {
            id: slot.appointment.user._id,
            firstName: slot.appointment.user.firstName,
            lastName: slot.appointment.user.lastName,
            email: slot.appointment.user.email,
            phone: slot.appointment.user.phone,
            gender: slot.appointment.user.gender,
            dateOfBirth: slot.appointment.user.dateOfBirth
          } : null,
          speciality: {
            id: slot.appointment.speciality._id,
            name: slot.appointment.speciality.name,
            description: slot.appointment.speciality.description
          },
          specialist: {
            id: slot.appointment.specialist._id,
            firstName: slot.appointment.specialist.firstName,
            lastName: slot.appointment.specialist.lastName,
            email: slot.appointment.specialist.contactInfo.email,
            phone: slot.appointment.specialist.contactInfo.phone,
            specialities: slot.appointment.specialist.specialities.map(speciality => {
              return {
                id: speciality._id.toString(),
                name: speciality.name,
                description: speciality.description
              };
            })
          },
          status: slot.appointment.status,
          joinUrl: slot.appointment.joinUrl
        } : null
      })) : []
    };
  } catch (error) {
    console.error("Error while retrieving a Specialist Schedule", error);
    throw error; // Rethrow or handle as needed
  }
},
    

    addNewTimeSlots: async ({ specialistId, slots }) => {
      try {
        console.log("id: ", specialistId);
        let schedule = await Schedule.findOne({ specialist: specialistId })
          .populate({
            path: 'specialist',
            select: '-schedule',
            populate: {
              path: 'specialities',
            },
          })
          .populate({
            path: 'slots',
            populate: {
              path: 'appointment',
              // strictPopulate: false,
              select: '-specialist -slot ',
              populate: [{
                path: 'user',
                select: '-appointments'
              },
              {
                path: 'speciality'
              },
              ], // populate speciality

            },
          })
          .exec();

        if (!schedule) {
          throw new Error(`Schedule not found for specialist with ID ${specialistId}`);
        }

        // Check for overlapping slots in the returned schedule
        // Check for overlapping slots
        const overlapExists = slots.some(newSlot => {
          // Convert newSlot times to Date objects for accurate comparison
          const newStart = new Date(newSlot.startTime);
          const newEnd = new Date(newSlot.endTime);

          return schedule.slots.some(existingSlot => {
            // Convert existingSlot times to Date objects
            const existingStart = new Date(existingSlot.startTime);
            const existingEnd = new Date(existingSlot.endTime);

            // Check if newSlot intersects with an existing slot
            return newStart < existingEnd && newEnd > existingStart;
          });
        });

        if (overlapExists) {
          throw new Error("One or more slots overlap with existing slots.");
        }


        // If no overlaps, proceed to create and save new slots
        const newSlotDocs = slots.length ? await Promise.all(slots.map(async (slot) => {
          if (!slot.startTime || !slot.endTime) {
            throw new Error("Missing startTime or endTime for a slot.");
          }
          const newSlot = new ScheduleSlot({
            startTime: slot.startTime,
            endTime: slot.endTime,
            appointment: null, // Assuming this is intentional
          });
          await newSlot.save();
          return newSlot;
        })) : [];


        console.log("New slot docs: ", newSlotDocs);

        // Add the new slot IDs to the schedule's slots array
        const newSlotIds = newSlotDocs.map(slotDoc => slotDoc._id);
        schedule.slots.push(...newSlotIds);

        // Save the updated schedule document
        schedule = await schedule.save();

        // Save the updated schedule document
        await schedule.save();

        // Assuming schedule has been saved and you have its ID
        schedule = await Schedule.findById(schedule._id)
          .populate({
            path: 'specialist',
            select: '-schedule',
            populate: {
              path: 'specialities',
            },
          })
          .populate({
            path: 'slots',
            populate: {
              path: 'appointment',
              select: '-specialist -slot',
              populate: [
              {
                path: 'user',
                select: '-appointments',
              },
              {
                path: 'speciality'
              },
            ]
              ,
            },
          });

        console.log("Repopulated Schedule: ", schedule);

        return {
          id: schedule._id,
          specialist: {
            id: schedule.specialist._id,
            firstName: schedule.specialist.firstName,
            lastName: schedule.specialist.lastName,
            email: schedule.specialist.contactInfo.email,
            phone: schedule.specialist.contactInfo.phone,
            specialities: schedule.specialist.specialities ? schedule.specialist.specialities.map(
              speciality => {
                console.log("Speciality @ return: ", speciality);
                return {
                  id: speciality._id,
                  name: speciality.name,
                  description: speciality.description
                }
              }
            ) : []
          },
          slots: schedule.slots ? schedule.slots.map(slot => {
            console.log("Slot: ", slot);
            console.log("Slot.appointment: ", slot.appointment);
            slot.appointment ? console.log("slot.appointment.speciality: ", slot.appointment.speciality) : console.log()
            return {
              slotId: slot._id,
              startTime: slot.startTime,
              endTime: slot.endTime,
              appointment: slot.appointment ? {
                id: slot.appointment._id,
                specialist: {
                  id: schedule.specialist._id,
                  firstName: schedule.specialist.firstName,
                  lastName: schedule.specialist.lastName,
                  email: schedule.specialist.contactInfo.email,
                  phone: schedule.specialist.contactInfo.phone,
                  specialities: schedule.specialist.specialities ? schedule.specialist.specialities.map(
                    speciality => {
                      console.log("Speciality @ return: ", speciality);
                      return {
                        id: speciality._id,
                        name: speciality.name,
                        description: speciality.description
                      }
                    }
                  ) : []
                },
                status: slot.appointment.status,
                joinUrl: slot.appointment.joinUrl,
                user: slot.appointment.user ? {
                  id: slot.appointment.user._id,
                  firstName: slot.appointment.user.firstName,
                  lastName: slot.appointment.user.lastName,
                  dateOfBirth: slot.appointment.user.dateOfBirth,
                  gender: slot.appointment.user.gender,
                  email: slot.appointment.user.email,
                  phone: slot.appointment.user.phone
                } : null,
                speciality: slot.appointment.speciality ? {
                  id: slot.appointment.speciality._id,
                  name: slot.appointment.speciality.name,
                  description: slot.appointment.speciality.description
                } : null,
              } : null
            }
          }) : []
        };
      } catch (error) {
        // Re-throw the error to allow the caller to handle it
        throw new Error(`Error while adding new time slots: ${error.message}`);
      }
    },
    removeTimeSlot: async ({ specialistId, slotId }) => {
      try {

        // First, ensure the slot exists and belongs to the correct specialist's schedule
        const slot = await ScheduleSlot.findById(slotId);
        if (!slot) {
          throw new Error(`Slot with ID ${slotId} not found.`);
        }

        // Find the schedule to update
        const schedule = await Schedule.findOneAndUpdate(
          { specialist: specialistId, slots: slotId },
          { $pull: { slots: slotId } },
          { new: true }
        ).exec();

        if (!schedule) {
          throw new Error(`Schedule not found for specialist with ID ${specialistId}, or slot ${slotId} does not belong to any of their schedules.`);
        }

        // After ensuring the schedule is found and updated, delete the specified slot
        await ScheduleSlot.findByIdAndDelete(slotId);

        return { message: `Slot removed successfully.` };
      } catch (error) {
        // Re-throw the error with a custom message for clarity
        throw new Error(`Error while removing time slot: ${error.message}`);
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
    createAppointment: async ({ userId, specialistId, specialityId, slotId }) => {
      try {
        // Check if the slot is already occupied by another appointment
        const existingAppointment = await Appointment.findOne({ slot: slotId });
        if (existingAppointment) {
          // Slot is already occupied, throw an error
          throw new Error(`Slot with ID ${slotId} is already occupied.`);
        }

        console.log("User Id: ", userId);
        console.log("Specialist Id: ", specialistId);
        console.log("Speciality Id: ", specialityId);
        console.log("Slot Id: ", slotId);

        // If the slot is not occupied, proceed to create a new appointment
        const appointment = await Appointment.create({
          user: userId,
          specialist: specialistId,
          status: "scheduled",
          speciality: specialityId,
          slot: slotId
        });

        // use the appointment ID to set the appointment id in the slot
        const updatedSlot = await ScheduleSlot.findByIdAndUpdate(
          slotId,
          { appointment: appointment._id },
          { new: true }
        ).exec();

        // append the appointment to user's appointments
        const user = await User.findById(userId);
        user.appointments.push(appointment._id);
        await user.save();

        return { id: appointment._id, userId };
      } catch (error) {
        // Rethrow the error to allow the caller to handle it.
        throw new Error(`Failed to create appointment: ${error.message}`);
      }
    },

    listAllAppointments: async (query) => {
      try {
        // use API Feature
        const features = new APIFeatures(Appointment.find()
          .populate({
            path: 'speciality',
          })
          .populate({
            path: 'user',
            select: '-appointments'
          })
          .populate({
            path: 'slot',
            select: '-appointment'
          })
          .populate({
            path: 'specialist',
            select: '-schedule',
            populate: {
              path: 'specialities',
              model: 'Speciality'
            }
          })
          ,
          query,
          ["from", "to"])
          .filter()
          .limitFields()
          .paginate()
          .sort()

        let appointments = await features.execWithPopulatedSort();
        console.log("-------------------------------------------------")
        console.log("-------------------------------------------------")

        console.log("Appointments: ", appointments);

        if (query.from) {
          console.log("Query start time:", query.from);
          const fromFilter = new Date(query.from);
          console.log("From filter:", fromFilter); // Logging the standardized ISO string for clarity

          appointments = appointments.filter(appointment => {
            // Check if `appointment.slot` and `appointment.slot.startTime` exist
            if (!appointment.slot || !appointment.slot.startTime) {
              console.log("Skipping appointment due to missing slot or slot.startTime");
              return false; // Skip this appointment if it doesn't have a slot or slot.startTime
            }

            console.log("Appointment start time:", appointment.slot.startTime);
            // Convert to Date object for comparison
            const appointmentStartTime = new Date(appointment.slot.startTime);
            console.log(appointmentStartTime)
            // Compare the appointment start time with the filter
            console.log("Compare times: ", appointmentStartTime >= fromFilter)
            return appointmentStartTime >= fromFilter;
          });

        }

        if (query.to) {
          console.log("Query end time:", query.to);
          const toFilter = new Date(query.to);
          console.log("End time filter:", toFilter.toISOString()); // Use ISO string for clarity

          appointments = appointments.filter(appointment => {
            // Check if `appointment.slot` and `appointment.slot.endTime` exist
            if (!appointment.slot || !appointment.slot.startTime) {
              console.log("Skipping appointment due to missing slot or slot.endTime");
              return false; // Skip this appointment if it doesn't have a slot or slot.endTime
            }

            console.log("Appointment end time:", appointment.slot.startTime);
            // Convert to Date object for comparison
            const appointmentStartTime = new Date(appointment.slot.startTime);
            // Compare the appointment end time with the filter
            console.log("Compare times: ", appointmentStartTime <= toFilter)
            return appointmentStartTime <= toFilter;
          });

        }
        console.log("Appointments: ", appointments);
        return appointments? appointments.map(appointment => {
          return {
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
        }): [];
      } catch (error) {
        throw new Error("Failed to retrieve appointments due to an internal error: ", error); // Example for API response
      }
    },

    cancelAppointment: async ({ id }) => {
      try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status: "cancelled" }, { new: true });
        return appointment;
      } catch (error) {
        console.log("Error while canceling appointment", error);
      }
    },
    updateAppointment: async ({ id, status }) => {
      try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
        return appointment;
      } catch (error) {
        console.log("Error while updating appointment", error);
      }
    },
    retrieveAppointmentById: async ({ id }) => {
      try {
        const appointment = await Appointment.findById(id);
        return appointment;
      } catch (error) {
        console.log("Error while retrieving a User", error);
      }
    }
  }
}
