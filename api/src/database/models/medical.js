const mongoose = require('mongoose')

const medicalSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },
  vaccination_against_chickenpox: Boolean,
  vaccinated_at_the_age_of: Number,
  infectious_disease_mumps_others: String,
  bronchitis_asthma_respiratory_tract_disease_others: String,
  congenital_congenital_heart_disease: Boolean,
  diabetes: Boolean,
  epilepsy_epilepsy_febrile_seizure: Boolean,
  hospital: String
})

module.exports = mongoose.model('medical', medicalSchema)
