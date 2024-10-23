export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}  

export function validateName(name) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
}

export function validateGender(gender) {
    let status = false;
    if( gender === "Male" || gender === "Female") {
        status = true;
    }
    return status;
}

export function validateDOB(dob) {
    const date = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    // console.log(date.getMonth() +" "+date.getFullYear());
    // console.log( (date.getMonth() <= 12) && (date.getMonth() >= 0) && (age >= 15) );
    if( (date.getMonth() <= 11) && (date.getMonth() >= 0) && (age >= 15)) {
        return true;
    }
    return false;

}

