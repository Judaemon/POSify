/**
 *  Sample error
 *  errors = {
 *    "email": [
 *      "The email field is required."
 *    ],
 *    "password": [
 *      "The password field is required."
 *    ]
 *  }
 */
type BackendErrors = {
  [key: string]: string[]; // Assuming backend sends an array of strings for each error key
}

export function handleErrorValidationFromBackend(errors: BackendErrors, form: any) {
  for (const key in errors) {
    form.setError(key, { message: errors[key][0] });
  }
}