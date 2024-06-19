import makeAppointmentRepository from './appointment-repository.js';
// import mongoose
import mongoose from 'mongoose';
import dotenv from "dotenv";

// load environment variables
dotenv.config({ path: `./.env` });

// we connect to the database
const db = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );

// Used to create DB connection
export async function makeDb () {
  // connect to mongodb database
  mongoose.connect(db, {});
}

// export makeAppointment
const appointmentRepository = makeAppointmentRepository({type: 'mongodb', repo: makeDb });

export default appointmentRepository

