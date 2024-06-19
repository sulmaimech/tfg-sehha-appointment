export default function buildMakeSpeciality(){
    return function makeSpeciality({
        id,
        name,
        description
        }){

        if(!id){
            throw new Error('Speciality must have an id');
        }
        if(!name){
            throw new Error('Speciality must have a name');
        }
        if(!description){
            throw new Error('Speciality must have a description');
        }
        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getDescription: () => description
            });
    }
}