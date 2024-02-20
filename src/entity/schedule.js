export default function buildMakeSchedule({makeProfessional, makeScheduleSlot}){
    return function makeSchedule({scheduleSlots, proffesional}){
        if (!proffesional) throw new Error('Professional is required.');
        const professional = makeProfessional({...proffesional})
        if (scheduleSlots) {
            const schedule = scheduleSlots.map(scheduleSlot => makeScheduleSlot({...scheduleSlot}))
        }
        return Object.freeze({
            getProfessional: () => professional,
            getScheduleSlots: () => schedule
        })
    }

}