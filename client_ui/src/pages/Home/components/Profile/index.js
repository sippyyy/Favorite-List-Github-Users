import { Col, Container, Row } from "react-bootstrap";
import './Profile.css'
import { useEffect, useState } from "react";
import ProfileFav from "./ProfileFav";
import { getUserProfile } from "../../../../services/services";

function Profile() {
    const [data,setData]  = useState('')
    const [listFav,setListFav] = useState([])
    const handleChooseId = (dataList)=>{
        setData(dataList)
    }

    useEffect(()=>{
        getUserProfile(localStorage.getItem('phone'),setListFav)
    },[])

    useEffect(()=>{
        setData(listFav[0])
    }, [listFav])
    
    return ( 
        <div>
            <Container className='margin-bar'>
                <h2 className='title padding-mid'>Profile Infomation</h2>

                <div className='light-gray radius padding-mid'>
                    <Row className='flex-mid'>
                        <Col xs={4} md={4} lg={4}>
                            <img className='circle profile' src="https://i.pinimg.com/originals/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg" alt='' />
                        </Col>
                        <Col xs={8} md={8} lg={8}>
                            <h2 className='none-margin'>{localStorage.getItem('phone')}</h2>
                        </Col>
                    </Row>
                </div>
                <div>
                    <h2 className='title padding-mid'>My Favorite Github List</h2>
                </div>
                {data?
                    <ProfileFav data={data} />
                :
                null}
                <ul className='info'>
                    {listFav.map((list,index)=>(
                        <li key={index} className='font-mid' onClick={() => handleChooseId(list)}>
                            {list.id} click to see detail profile
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
     );
}

export default Profile;