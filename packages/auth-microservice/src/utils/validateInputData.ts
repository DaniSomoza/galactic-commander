import Joi from 'joi'

async function validateInputData<T>(data: T, inputDataSchema: Joi.ObjectSchema<T>): Promise<T> {
  return await inputDataSchema.validateAsync(data)
}

export default validateInputData
