import { Container, Row,Col } from "react-bootstrap";
import './Bar.css'
import FormSearch from "./FormSearch";



function Bar({setList,setMode,setUser,setView}) {

    const handleChooseView = (data)=>{
        setView(data)
    }

    const handleLogout = ()=>{
        localStorage.removeItem('user')
        window.location.replace('/singin')

    }

    return ( 
        <div className='dark-purple-bg bar' >
            <Container className='full-height'>
                <Row className='full-height'>
                    <Col  xs={2} md={2} lg={2}>
                        <div className='full-width full-height flex flex-start flex-mid'>
                            <p onClick={()=>handleChooseView('list')} className='white-color font-max none-margin'>
                                Logo
                            </p>
                        </div>
                    </Col>
                    <Col xs={7} md={7} lg={7}>
                        <div className='flex flex-mid full-height full-width'>
                            <FormSearch setView={setView} setMode={setMode} setUser={setUser} setList={setList} />
                        </div>
                    </Col>
                    <Col xs={3} md={3} lg={3}>
                        <div className='full-width full-height flex flex-end flex-mid'>
                            <img onClick={()=>handleChooseView('profile')} className='circle' src='https://i.pinimg.com/originals/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' alt='' />
                            <button onClick={handleLogout} className='font-text buttonBar light-purple-bg margin-left-10 radius white-color none-margin flex flex-mid padding-mid'>Log out</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
     );
}

export default Bar;