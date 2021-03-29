const addresses = require('../database/models/address')
const childs = require('../database/models/child')
const childDynamicInfo = require('../database/models/child_dynamic')
const childStaticInfo = require('../database/models/childStatic')
const documents = require('../database/models_v2/document')
const guardians = require('../database/models/guardian')
const habits = require('../database/models/child_info')
const historyStocks = require('../database/models/history_stock')
const medicals = require('../database/models/medical')
const medicalsV2 = require('../database/models_v2/medical')
const rooms = require('../database/models/enrollment')
// const infoItems = require('../database/models/info_item')
const stocks = require('../database/models/stock')
const showStocks = require('../database/models/show_stock')

const { medicalInfo, documentInfo, habitInfo } = require('../helpers/handleArray')
const {
  sendErrorResponse,
  sendSuccessResponse
} = require('../helpers/apiResponse')
const { stringToObjectId } = require('../database/models/roomType')

module.exports = {
  async registerForm_v2 (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const {
        child,
        father,
        mother,
        custodian,
        address,
        document,
        habit,
        medical
      } = req.body.listForm

      let gender = 0
      // Convert String to Int
      if (child.gender === 'male') {
        gender = 1
      } else {
        gender = 2
      }

      const room = stringToObjectId(child.room)

      try {
        const childInfo = await childs.create({
          firstname: child.firstname,
          middlename: child.middlename,
          lastname: child.lastname,
          gender,
          nickname: child.nickname,
          birth_date: child.birth_date
        })

        const childId = childInfo._id

        await rooms.create({
          child: childId,
          room,
          startDate: child.startDate,
          endDate: null
        })
        // create dynamic childInfo
        await childDynamicInfo.create({
          child: childId,
          history_accident: [child.history_accident],
          immunization_record: [child.immunization_record],
          weight: [
            {
              value: child.weight,
              date: child.application_date
            }
          ],
          height: [
            {
              value: child.height,
              date: child.application_date
            }
          ],
          photo: [
            {
              value: child.url,
              date: child.application_date
            }
          ]
        })
        // create static childInfo
        await childStaticInfo.create({
          child: childId,
          race: child.race,
          nationality: child.nationality,
          religion: child.religion,
          number_of_siblings: child.siblingsNum,
          child_number: child.childNum,
          application_date: child.application_date
        })

        for (let i = 0; i < 3; i++) {
          // i = 0 (father), i = 1 (mother), i = 2 (guardians)
          if (i === 0) {
            if (father.father_name !== null && father.telephone !== null) {
              await guardians.create({
                child: childId,
                custodian_name: father.father_name,
                occupation: father.occupation,
                id_card: father.id_card,
                email: father.email,
                telephone: father.telephone,
                relationship: 'father',
                url: null,
                date_sign: null
              })
            }
          }
          if (i === 1) {
            if (mother.name !== null && mother.telephone !== null) {
              await guardians.create({
                child: childId,
                custodian_name: mother.name,
                occupation: mother.occupation,
                id_card: mother.id_card,
                email: mother.email,
                telephone: mother.telephone,
                relationship: 'mother',
                url: null,
                date_sign: null
              })
            }
          }
          if (i === 2) {
            if (custodian.name !== null && custodian.telephone !== null) {
              await guardians.create({
                child: childId,
                custodian_name: custodian.name,
                occupation: custodian.occupation,
                id_card: custodian.id_card,
                email: custodian.email,
                telephone: custodian.telephone,
                relationship: 'custodian',
                url: custodian.url,
                date: custodian.date_sign
              })
            }
          }
        }
        if (address.name_village !== null || address.telephone !== null) {
          await addresses.create({
            child: childId,
            name_village: address.name_village,
            house_number: address.house_number,
            moo: address.moo,
            sub_district: address.sub_district,
            district: address.district,
            province: address.province,
            telephone: address.telephone,
            house_map: address.house_map
          })
        }

        const documentList = documentInfo(document)

        await documents.create({
          child: childId,
          info: documentList
        })

        const listHabitResult = habitInfo(habit)

        await habits.create({
          child: childId,
          infoItem: listHabitResult,
          other: habit.other_information
        })

        const medicalList = medicalInfo(medical)

        await medicalsV2.create({
          child: childId,
          info: medicalList,
          hospital: [
            {
              value: medical.Hospital,
              date: child.application_date
            }
          ]
        })

        res.status(201).json({ code: 201, message: 'ลงทะเบียนเสร็จสิ้น', data: null })
      } catch (error) {
        console.log(error.message)
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async regisChild_v2 (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'accountant') {
      const { child, father, mother, custodian, address } = req.body.listForm

      let gender = 0
      // Convert String to Int
      if (child.gender === 'male') {
        gender = 1
      } else {
        gender = 2
      }

      const room = stringToObjectId(child.room)

      let childInfoMain = {}

      try {
        if (child.firstname !== null && child.lastname !== null) {
          childInfoMain = await childs.create({
            firstname: child.firstname,
            middlename: child.middlename,
            lastname: child.lastname,
            gender,
            nickname: child.nickname,
            birth_date: child.birth_date
          })
        } else {
          res.json({
            code: 400,
            message: 'กรุณากรอกชื่อจริงนามสกุล',
            data: null
          })
          return
        }

        const childId = childInfoMain._id

        if (room !== null) {
          await rooms.create({
            child: childId,
            room,
            startDate: child.startDate,
            endDate: null
          })
        } else {
          res.json({
            code: 400,
            message: 'กรุณาเลือกห้องเรียนให้เด็กก่อน',
            data: null
          })
          return
        }

        await childDynamicInfo.create({
          child: childId,
          history_accident: [child.history_accident],
          immunization_record: [child.immunization_record],
          weight: [
            {
              value: child.weight,
              date: child.application_date
            }
          ],
          height: [
            {
              value: child.height,
              date: child.application_date
            }
          ],
          photo: [
            {
              value: child.url,
              date: child.application_date
            }
          ]
        })

        await childStaticInfo.create({
          child: childId,
          race: child.race,
          nationality: child.nationality,
          religion: child.religion,
          number_of_siblings: child.siblingsNum,
          child_number: child.childNum,
          application_date: child.application_date
        })

        for (let i = 0; i < 3; i++) {
          // i = 0 (father), i = 1 (mother), i = 2 (guardians)
          if (i === 0) {
            if (father.father_name !== null && father.telephone !== null) {
              await guardians.create({
                child: childId,
                name: father.father_name,
                occupation: father.occupation,
                id_card: father.id_card,
                email: father.email,
                telephone: father.telephone,
                relationship: 'father',
                url: null,
                date_sign: null
              })
            }
          }
          if (i === 1) {
            if (mother.name !== null && mother.telephone !== null) {
              await guardians.create({
                child: childId,
                name: mother.name,
                occupation: mother.occupation,
                id_card: mother.id_card,
                email: mother.email,
                telephone: mother.telephone,
                relationship: 'mother',
                url: null,
                date_sign: null
              })
            }
          }
          if (i === 2) {
            if (custodian.name !== null && custodian.telephone !== null) {
              await guardians.create({
                child: childId,
                name: custodian.name,
                occupation: custodian.occupation,
                id_card: custodian.id_card,
                email: custodian.email,
                telephone: custodian.telephone,
                relationship: 'custodian',
                url: custodian.url,
                date: custodian.date_sign
              })
            }
          }
        }

        if (address.name_village !== null || address.telephone !== null) {
          await addresses.create({
            child: childId,
            name_village: address.name_village,
            house_number: address.house_number,
            moo: address.moo,
            sub_district: address.sub_district,
            district: address.district,
            province: address.province,
            telephone: address.telephone,
            house_map: address.house_map
          })
        }

        res.status(201).json({ code: 201, message: 'ลงทะเบียนเสร็จสิ้น', data: null })
      } catch (error) {
        console.log(error.message)
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async docForm_v1 (req, res) {
    const { position } = req
    if (position) {
      const { child, document, habit, medical } = req.body.listForm

      try {
        await documents.create({
          child,
          copy_of_birth_certificate: document.birth_certificate,
          copy_of_idcard_or_passport: {
            father: document.id_card_father,
            mother: document.id_card_mother
          },
          copy_of_house_record: document.house_record,
          copy_of_life_insurance_card: document.life_lnsurance_card,
          copy_of_health_examination_and_vaccination_record:
            document.health_vaccination,
          photo: document.baby_photo
        })

        const listHabitCompare = [
          '5fe0470fa420791e31609d4d',
          '5fe046d5a420791e31609d4c',
          '5fe04716a420791e31609d4e',
          '5fe0471ba420791e31609d4f',
          '5fe04723a420791e31609d50',
          '5fe0472aa420791e31609d51',
          '5fe0475da420791e31609d52',
          '5fe04772a420791e31609d54',
          '5fe0477ca420791e31609d55',
          '5fe0476ba420791e31609d53',
          '5fe0479ca420791e31609d56',
          '5fe047b0a420791e31609d57',
          '5fe047b5a420791e31609d58',
          '5fe047cfa420791e31609d59',
          '5fe047dba420791e31609d5a',
          '5fe047eda420791e31609d5b'
        ]

        const listHabitRequest = [
          habit.pillow_aficionado,
          habit.doll_aficionado,
          habit.fabric_aficionado,
          habit.pacifier_aficionado,
          habit.breast_feeding_aficionado,
          habit.crib_aficionado,
          habit.food_allergy_detail,
          habit.milk_intolerance_detail,
          habit.no_yogurt_allergy_detail,
          habit.no_allergy_to_medicine_detail,
          habit.milk_powder_in_bottle,
          habit.uht_milk_box_in_bottle,
          habit.uht_milk_box,
          habit.always_use_diaper,
          habit.not_use_diaper,
          habit.diaper_only_sleeping
        ]
        const listHabitResult = []

        for (let a = 0; a < 16; a++) {
          if (listHabitRequest[a] === false || listHabitRequest[a] === null) {
            // Do nothing
          } else {
            if (listHabitRequest[a] === true) {
              listHabitResult.push({
                info_item: listHabitCompare[a],
                itemDetail: null
              })
            } else {
              listHabitResult.push({
                info_item: listHabitCompare[a],
                itemDetail: listHabitRequest[a]
              })
            }
          }
        }

        console.log(listHabitResult)

        if (listHabitResult !== []) {
          await habits.create({
            child,
            infoItem: listHabitResult,
            other: habit.other_information
          })
        }

        if (medical.Hospital !== null) {
          await medicals.create({
            child,
            vaccination_against_chickenpox:
              medical.vaccination_against_chickenpox,
            vaccinated_at_the_age_of: medical.vaccinated_at_the_age_of,
            infectious_disease_mumps_others:
              medical.Infectious_Disease_Mumps_or_Others,
            bronchitis_asthma_respiratory_tract_disease_others:
              medical.Bronchitis_Asthma_Respiratory_Tract_Disease_Others,
            congenital_congenital_heart_disease:
              medical.Congenital_Heart_Disease,
            diabetes: medical.Diabetes,
            epilepsy_epilepsy_febrile_seizure: medical.Epilepsy_Febrile_Seizure,
            hospital: medical.Hospital
          })
        } else {
          res.json({
            code: 400,
            message: 'กรุณากรอกโรงพยาบาลด้วย',
            data: null
          })
          return
        }
        res.status(201).json({ code: 201, message: 'กรอกเอกสารเสร็จสิ้น', data: null })
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async docForm_v2 (req, res) {
    const { position, owner } = req
    if (position === 'admin' || position === 'accountant') {
      const { child, document, habit, medical, uniform } = req.body.listForm
      console.log(req.body.listForm)

      const medicalList = medicalInfo(medical)
      const documentList = documentInfo(document)
      const listHabitResult = habitInfo(habit)

      try {
        // Check amount must not negative
        for (let index = 0; index < uniform.length; index++) {
          if (parseInt(uniform[index].amount) < 0) {
            console.log(parseInt(uniform[index].amount))
            res.json({
              code: 400,
              message: `กรุณาป้อนจำนวน${uniform[index].item}ของเป็นค่าบวก`,
              data: null
            })
            return 0
          }
        }

        if (medical.Hospital !== null) {
          await medicalsV2.create({
            child,
            info: medicalList,
            hospital: [
              {
                value: medical.Hospital,
                date: child.application_date
              }
            ]
          })
        } else {
          res.json({
            code: 400,
            message: 'กรุณากรอกโรงพยาบาลด้วย',
            data: null
          })
          return
        }
        await documents.create({
          child,
          info: documentList
        })
        await habits.create({
          child,
          infoItem: listHabitResult,
          other: habit.other_information
        })

        const listItemId = []
        const updateAmount = []

        for (let i = 0; i < uniform.length; i++) {
          const checkSize = uniform[i].size.toUpperCase()
          if (
            checkSize === 'S' ||
            checkSize === 'M' ||
            checkSize === 'L' ||
            checkSize === 'XL' ||
            checkSize === '2XL' ||
            checkSize === 'FREE SIZE'
          ) {
            // console.log(uniform[i].item);
            // console.log(checkSize);
            const result = await stocks.findOne({
              item: uniform[i].item,
              size: checkSize
            })
            listItemId.push(result._id)
          } else {
            res.json({
              code: 400,
              message: 'กรุณาเลือกไซส์ตามที่กำหนดให้',
              data: null
            })
            return
          }
        }
        // console.log(listItemId);
        for (let j = 0; j < listItemId.length; j++) {
          const target = await showStocks.findOne({ item: listItemId[j] })

          // console.log(showStocks);

          if (target.amount < parseInt(uniform[j].amount)) {
            console.log(target.amount)
            console.log(uniform[j].amount)
            console.log('what')
            res.json({
              code: 400,
              message: `ขออภัยเป็นอย่างยิ่ง ${uniform[j].item}ไซส์นี้มีไม่เพียงพอ`,
              data: null
            })
            return
          } else {
            updateAmount.push(target.amount - parseInt(uniform[j].amount))
          }
        }
        // console.log(updateAmount);
        for (let k = 0; k < listItemId.length; k++) {
          const oldAmount = '-' + uniform[k].amount

          await showStocks.updateOne(
            { item: listItemId[k] },
            { amount: updateAmount[k] }
          )
          await historyStocks.create({
            updateOn: new Date(),
            amount: oldAmount,
            item: listItemId[k],
            modify_by: owner
          })
        }

        res.status(201).json({ code: 201, message: 'กรอกเอกสารเสร็จสิ้น', data: null })
      } catch (error) {
        console.log(error)
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async getChildNotRegister (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        const child = await childs.find({})
        const answer = []

        for (let i = 0; i < child.length; i++) {
          const haveChildDocument = await documents.findOne({
            child: child[i]._id
          })
          console.log(haveChildDocument)
          if (haveChildDocument === null) {
            answer.push({
              child: child[i]._id,
              name:
                child[i].firstname +
                child[i].middlename +
                ' ' +
                child[i].lastname
            })
          }
        }
        sendSuccessResponse(res, answer)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 400, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  }
}
