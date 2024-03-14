export default function buildMakeSchedule({makeSpecialist, makeScheduleSlot}){
    return function makeSchedule({id, slots, specialist}){
        if (!id) throw new Error('id is required.');
        if (!specialist) throw new Error('Specialist is required.');
        const spec = makeSpecialist({...specialist})
        let schedule = []
        if (slots) {
            schedule = slots.map(slot => makeScheduleSlot({...slot}))
        }
        return Object.freeze({
            getId: () => id,
            getSpecialist: () => spec,
            getSlots: () => schedule
        })
    }

}