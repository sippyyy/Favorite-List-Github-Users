import { Field, Form, Formik } from 'formik'
import axios from 'axios';
import '.././Bar.css'
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import {useRef } from 'react';

function FormSearch({setList,setMode,setUser,setView}) {

    const userRef= useRef(null)

    return ( 
            <Formik
                initialValues={
                    {
                        user: ''
                    }
                }
                onSubmit={(values) => {
                    String.prototype.isNumber = function () { return /^\d+$/.test(this); }
                    if(values.user !== userRef.current){
                        let param = ''
                        let param2 = ''
                        if (values.user){
                            param='search/users?q='
                            param2 = '&per_page=20'
                            setMode('find')
                        }else if(!values.user){
                            param='users'
                            setMode('all')
                        }
                        axios.get(`${process.env.REACT_APP_BASE_GITHUB+param}${values.user ? values.user : ''}${param2}`)
                        .then(res => {
                            const allData = res.data.items ? res.data.items : res.data
                            if (Array.isArray(allData)){
                                setList(allData)
                            }else{
                                setList([allData])
                            }
                        })
                        userRef.current = values.user
                        setUser(values.user)
                        setView('list')
                    }

                }}
            >
                <Form className='full-width'>
                    <div className='input-container padding-mid radius flex'>
                        <Field placeholder='Search user id or user name' name='user' className='white-color font-text' />
                        <button type='submit' className=' full-flex flex-mid flex white-color font-mid none-margin icon'><BsSearch /></button>
                    </div>
                </Form>
            </Formik>
     );
}

export default FormSearch;