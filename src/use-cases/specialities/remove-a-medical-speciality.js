export default function makeRemoveSpeciality({ appointmentRepository }) {
    return async function removeSpeciality({ id }) {
        // Attempt to remove the speciality by ID
        const speciality = await appointmentRepository.removeSpeciality({ id });

        // If 'speciality' is null, it means no document was found and removed
        if (!speciality) {
            throw new Error("Speciality not found or could not be removed");
        }

        // If this point is reached, it means the speciality was successfully removed
        // You might want to return a confirmation message or the removed speciality's details
        return speciality;
    }
}
