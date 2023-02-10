import { Col, Row } from "react-bootstrap";
import '../Profile.css'

function ProfileFav({data}) {
    return ( 
        <div >
            <div className='light-gray padding-mid radius'>
                <Row className='flex-mid'>
                    <Col className='flex flex-mid' xs={3} md={3} lg={3}>
                        <img className='gitUser circle' src={data.avatar_url} />
                    </Col>
                    <Col xs={9} md={9} lg={9}>
                        <Row>
                            <Col xs={3} className='bold'>ID</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>{data.id}</Col>
                        </Row>
                        <Row>
                            <Col  xs={3} className='bold'>User login</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>{data.login
}</Col>
                        </Row>
                        <Row>
                            <Col xs={3} className='bold'>Bio</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>{data.bio}</Col>
                        </Row>
                        <Row>
                            <Col xs={3} className='bold'>Location</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>{data.location}</Col>
                        </Row>
                        <Row>
                            <Col xs={3} className='bold'>Blog</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>
                                <a href={data.blog}>{data.blog}</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} className='bold'>Public Repos</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>{data.public_repos}</Col>
                        </Row>
                        <Row>
                            <Col xs={3} className='bold'>Name</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>{data.name}</Col>
                        </Row>
                        <Row>
                            <Col xs={3} className='bold'>Twitter</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={8} className='hideTextLimited'>{data.twitter_username}</Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
     );
}

export default ProfileFav;