export default {
  fieldValidationErrors: {
    name: {
      isEmpty: 'Enter access point name',
      invalidLength: 'The name must be between 3 and 50 characters long.'
    },
    model: {
      isEmpty: 'Enter access point model',
      invalidLength: 'The name of model must be between 3 and 50 characters long.'
    },
    ip: {
      isEmpty: 'Enter ip-address',
      invalidIp: 'Invalid ip-address'
    },
    band: {
      isEmpty: 'Select band'
    },
    location: {
      isEmpty: 'Enter location',
      invalidLength: 'The name of location must be between 3 and 50 characters long.'
    }
  },
  fieldPlaceHolders: {
    ip: '###.###.###.###',
    band: 'Select band',
    name: 'Input access point name',
    location: 'Input access point location',
    model: 'Input access point model'
  }
}
