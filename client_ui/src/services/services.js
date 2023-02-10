import * as httpRequest from '../utils/request'

export const getCode = async (data) => {
    try {
        const info = await httpRequest.post('getcode',
            data
        )
        return info
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (data) => {
    try {
        const info = await httpRequest.post('signin',
            data
        )
        return info
    } catch (error) {
        console.log(error)
    }
}

export const like = async (data) => {
    try {
        const info = await httpRequest.post('/likeGithubUser',
            data
        )
        return info
    } catch (error) {
        console.log(error)
    }
}

export const favListId = async (phone, setArrayChoose) => {
    try {
        const info = await httpRequest.get('/getFavList',{
            params:{
                phone
            }
        })
        if (info.favList){
            setArrayChoose(info.favList)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUserProfile = async (phone_number, setListFav) => {
    try {
        const info = await httpRequest.get('/getUserProfile', {
            params: {
                phone_number
            }
        })
        console.log(info)
        // setListFav(info.favorite_github_users)
    } catch (error) {
        console.log(error)
    }
}
