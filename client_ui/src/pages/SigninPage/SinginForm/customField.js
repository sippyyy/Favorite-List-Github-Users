import { useField } from "formik"

export const TextField = ({ children, label, buttonName, children2, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className='topic' >
            {label ? <label className='font-text bold' >{label}</label> : null}
            <div>
                <input className='padding-mid border radius font-text full-width'
                    autoComplete='off' {...props} {...field}
                />
                {meta.error && meta.touched ? (<p className='red' >{meta.error}</p>) : null}
            </div>

        </div>
    )
}