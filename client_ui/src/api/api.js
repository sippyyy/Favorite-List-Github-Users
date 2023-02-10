import SigninSlice from '../pages/SigninPage/SigninSlice'
import * as services from '../services/services'

export const getVerifiedCode = async (formData) => {
    const result = await services.getCode(formData)
    console.log(result)
    const { status } = result || {}
    if (status === 200 || status === 201){
            console.log(status)
        }
}

export const requestSignin = async (formData, func,value) => {
    const result = await services.signIn(formData)
    console.log(result)
    const { status,data } = result || {}
    if (status === 200 || status === 201) {
        const {success,message} = data || {}
        if(success){
            func(SigninSlice.actions.setAuthentication(true))
            localStorage.setItem('user', 'ok')
            localStorage.setItem('phone', value)
        }else{
            console.log(message)
        }
    }
}

export const addRemove = async (formData) => {
    const result = await services.like(formData)
    const { status } = result || {}
    if (status === 200 || status === 201) {
        console.log(status)
    }
}

export const getFavListId = async()=>{
    const result = await services.favListId()
    console.log(result)
}

