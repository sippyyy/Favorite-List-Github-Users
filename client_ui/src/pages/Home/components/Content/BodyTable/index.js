import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { useEffect, useState } from "react";
import { addRemove} from "../../../../../api/api";
import { favListId } from "../../../../../services/services";

function BodyTable({list}) {

    const [arrayChoose,setArrayChoose] = useState([])

    const handleChoose= (data)=>{
        const newArr = [...arrayChoose]
        const index = arrayChoose.findIndex(i=>i === +data)
        if(index === -1){
            newArr.push(data.toString())
        }else{
            newArr.splice(index,1)
        }
        setArrayChoose(newArr)
        const formData = new FormData()
        formData.append('phone_number',localStorage.getItem('phone'))
        formData.append('github_user_id',data)
        addRemove(formData)
        console.log(arrayChoose)
    }

    useEffect(()=>{
        favListId(localStorage.getItem('phone'), setArrayChoose)
    },[])

    useEffect(()=>{
        console.log(arrayChoose)
    },[arrayChoose])

    return ( 
        list ? 
            list.length > 0?
                list.map((data,index)=>(
                    <>
                        <tr>
                            <td rowSpan={2}>
                                <p className='none-margin bod font-text bold'>{data.id}</p>
                            </td>

                            <td>
                                <img className='circle' src={data.avatar_url} alt='' />
                            </td>
                            <td>
                                <a href={data.repos_url} className='text-limited none-margin'>{data.repos_url}</a>
                            </td>
                            <td rowSpan={2}>
                                <a href={data.followers_url} className='text-limited none-margin'>{data.followers_url}</a>
                            </td>
                            <td rowSpan={2}>
                                <p onClick={()=>handleChoose(data.id)} className={`font-max none-margin${arrayChoose?.indexOf((data.id).toString()) !== -1 ? ' red' : ''}`}><AiFillHeart /></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className='text-limited none-margin'>{data.login}</p>
                            </td>
                            <td>
                                <a href={data.html_url} className='text-limited none-margin'>{data.html_url}</a>
                            </td>
                        </tr>
                    </>
                ))
            :
            null
        :
        null
     );
}

export default BodyTable;