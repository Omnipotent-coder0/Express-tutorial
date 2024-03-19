export const userValidationSchema = {
    username : {
        notEmpty : {
            errorMessage : "username cannot be Empty!",
        },
        isString : {
            errorMessage : "username must be a String!",
        },
        isLength : {
            options : {
                min : 3,
                max : 10,
            },
            errorMessage : "username must be between 3 to 10 characters long!",
        },
    },
    displayName : {
        notEmpty : true,
        isLength : {
            options : {
                min : 3,
                max : 15,
            },
            errorMessage : "displayName must be between 3 to 15 characters long!",
        },
    }
}