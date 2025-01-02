
export function validateTripData(data, isUpdate){ //remove isUpdate and give all the data
    const errors = [];

    if(!isUpdate && !data.userId){
        errors.push("User id is required for a new trip");
    }

    if(!isUpdate && !data.destination){
        errors.push("Destination is required for a new trip");
    }

    if(data.FromDate && data.ToDate){
        const fromDate = new Date(data.FromDate);
        const toDate = new Date(data.ToDate);

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            errors.push("Invalid date format");

        } else if (toDate < fromDate) {
            errors.push("End date cannot be before start date");
        }
    }

    if(data.budget && data.budget < 0){
        errors.push("Budget cannot be less than 0");
    }

    if(data.budget - data.spent < 0){
        errors.push("Amount spent cannot exceed budget");
    }

    console.log(errors);

    return {isValid: errors.length === 0 , errors};

}