import { Form, useFormikContext } from "formik";
import { TextField } from "./customField";
import './SigninForm.css'
import {Col, Row} from 'react-bootstrap'
import { useEffect, useState } from "react";
import { getVerifiedCode } from "../../../api/api";
import { useDebounceEffect } from 'ahooks'

function SigninForm() {

    const [disableGetCode,setDisableGetCode] = useState(true)
    const {values} = useFormikContext()
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (timeLeft === 0) {
            setTimeLeft(null)
        }
        if (!timeLeft) return;
        const intervalId = setInterval(() => {

            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);

    }, [timeLeft]);

    const handleGetCode = ()=>{
        var formPhone = new FormData()
        if(values.phone){
            formPhone.append('phone',values.phone)
            setDisableGetCode(true)
            setTimeLeft(30)
            setTimeout(() => {
                setDisableGetCode(false)
            }, 30000);
            getVerifiedCode(formPhone)
        }else{
            setDisableGetCode(true)
        }
    }

    useDebounceEffect(
        () => {
            if(values?.phone?.length > 7){
                setDisableGetCode(false)
            }
        },
        [values.phone],
        {
            wait: 1500,
        },
    );


    return (
        <Form>
            <div className='fixed-form flex flex-mid light-purple-bg' >

                <div className='form light-gray radius '>
                    <h2 className='topic center-text' >Welcome to Github Favorite List</h2>
                    <div >
                        <TextField
                            label='Phone Number :'
                            name='phone'
                            placeholder='Please fill your phone number'
                        />
                        <Row>
                            <Col xs={8}>
                                <TextField
                                    label='Verified code :'
                                    name='code'
                                    placeholder='Please fill the code'
                                />
                            </Col>
                            <Col className='flex flex-mid bottom'>
                                <p disabled={disableGetCode} type='button' onClick={handleGetCode} className={`topic padding-mid med-purple-bg white-color radius font-text ${disableGetCode ? 'light-purple-bg' : ''}`}>Send code!</p>
                            </Col>
                        </Row>
                        {timeLeft > 0? 
                            <p className='none-margin font-text'>Don't receive the code ? Resend code in 00:{timeLeft}s</p>
                        :
                        null
                        }
                        <div >
                            <button  className='padding-max dark-purple-bg radius white-color topic bold font-mid full-width
                            ' type='submit'>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default SigninForm;