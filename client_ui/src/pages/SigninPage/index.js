import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import SigninForm from "./SinginForm";
import { useSelector } from "react-redux";
import { loginStatus } from "../../redux/selectors";
import { useEffect} from "react";
import { requestSignin } from "../../api/api";

function SinginPage() {
    const dispatch = useDispatch()
    const loginAuthentication = useSelector(loginStatus)

    useEffect(()=>{
        if(loginAuthentication){
            window.location.replace('/')
        }
    },[])

    return (
        !loginAuthentication ?
            <Formik
                initialValues={
                    {
                        phone: '',
                        code: ''
                    }

                }
                validationSchema={Yup.object({
                    phone: Yup.string()
                        .required("Phone is required"),
                    code: Yup.string()
                        .required("Pass word is required")
                })
                }
                onSubmit={(values, actions) => {
                    const formData = new FormData()
                    formData.append('phone',values.phone)
                    formData.append('code', values.code)
                    requestSignin(formData,dispatch,values.phone)
                }}
            >
                <SigninForm  />
            </Formik>
        :
        null

    );
}

export default SinginPage;