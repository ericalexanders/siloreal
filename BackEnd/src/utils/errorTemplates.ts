
const createErrorsFactory = function (name: string, status: number) {
    return class BusinessError extends Error {
        status = status
        constructor (message: string) {
            super(message)
            this.name = name
            Object.setPrototypeOf(this, BusinessError.prototype)
        }
    }
}

//export const ConnectionError = createErrorsFactory('ConnectionError')
//export const ValidationError = createErrorsFactory('ValidationError')
export const UserNotFoundError = createErrorsFactory('UserNotFound', 404)
export const CompanyExistError = createErrorsFactory('CompanyAlreadyExist', 400)

export const MappingNameError = createErrorsFactory('MappingNameAlreadyExist', 400)