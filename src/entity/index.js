import buildMakeAppointment from "./appointment.js";
import buildMakeSchedule from "./schedule.js";
import buildMakeScheduleSlot from "./scheduleSlot.js";
import buildMakeSpecialist from "./specialist.js";
import buildMakeSpeciality from "./speciality.js";
import buildMakeUser from "./user.js";

const makeUser = buildMakeUser();
const makeSpeciality = buildMakeSpeciality();
const makeSpecialist = buildMakeSpecialist({ makeSpeciality });
const makeAppointment = buildMakeAppointment({ makeSpecialist, makeUser, makeSpeciality });
const makeScheduleSlot = buildMakeScheduleSlot(makeAppointment);
const makeSchedule = buildMakeSchedule({ makeSpecialist, makeScheduleSlot });

export default { makeUser, makeSpeciality, makeSpecialist, makeAppointment, makeScheduleSlot, makeSchedule };