const medicals = require('../domain/models/medical')
const medicalV2 = require('../domain/models_v2/medical')

const { sendSuccessResponse, sendErrorResponse } = require('../helpers/apiResponse')

module.exports = {
  async createList (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'accountant') {
      const {
        id,
        vaccination_against_chickenpox,
        vaccinated_at_the_age_of,
        infectious_disease_mumps_others,
        bronchitis_asthma_respiratory_tract_disease_others,
        congenital_congenital_heart_disease,
        diabetes,
        epilepsy_epilepsy_febrile_seizure,
        hospital
      } = req.body

      try {
        const result = await medicals.create({
          child: id,
          vaccination_against_chickenpox,
          vaccinated_at_the_age_of,
          infectious_disease_mumps_others,
          bronchitis_asthma_respiratory_tract_disease_others,
          congenital_congenital_heart_disease,
          diabetes,
          epilepsy_epilepsy_febrile_seizure,
          hospital
        })
        sendSuccessResponse(res, result)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async getHospitalName (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const { id } = req.body

      try {
        const result = await medicals.findOne({ child: id })
        sendSuccessResponse(res, { hospital: result.hospital })
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async getAllDetail (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const { id } = req.body

      try {
        const result = await medicals.findOne({ child: id })
        sendSuccessResponse(res, result)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async updateList (req, res) {
    const { id, hospital } = req.body
    const condition = { child: id }
    const update = { hospital }
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        const result = await medicals.findOneAndUpdate(condition, update)
        sendSuccessResponse(res, { hospitalPast: result.hospital }, 201)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async updateHospital (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'accountant') {
      const { _id, hospital } = req.body
      const hospitalInfo = {
        value: hospital,
        date: new Date()
      }

      try {
        const result = await medicalV2.updateOne(
          { child: _id },
          { $push: { hospital: hospitalInfo } }
        )
        sendSuccessResponse(res, result, 204)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  }
}
