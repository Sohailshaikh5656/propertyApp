import * as Yup from 'yup';
import { useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner'
import { useState } from 'react';

export default function AddProperties(data) {
    const [btn, setBtn] = useState(false)
    const initialState = {
        title: "",
        type: "",
        price: "",
        location: "",
        image: "",
        description: "",
        short: ""
    }

    const validationSchema = Yup.object({
        title: Yup.string().min(6, "Title must be at least 6 characters").required("Title is required"),
        type: Yup.string().min(3, "Type must be at least 3 characters").required("Type is required"),
        price: Yup.number().min(2000, "Price must be at least 2000").required("Price is required"),
        location: Yup.string().min(6, "Location must be at least 6 characters").required("Location is required"),
        image: Yup.string().url("Must be a valid URL").required("Image URL is required"),
        description: Yup.string().min(20, "Description must be at least 20 characters").required("Description is required"),
        short: Yup.string().min(8, "Short description must be at least 8 characters").required("Short description is required")
    })

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setBtn(true)
                let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/properties`, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                })
                response = await response.json()
                if (response.code == 1) {
                    setTimeout(()=>{
                        resetForm()
                        setBtn(false)
                        toast.success('Property added successfully!');

                    },2000)
                }
            } catch (error) {
                console.log("Error : ", error)
            }
        }
    })
    return (
        <>
            <ToastContainer />
            <form className='p-3' noValidate onSubmit={formik.handleSubmit}>
                <div className="row my-2">
                    <h3 className='text-secondary'>Add Property</h3>
                </div>
                <div className="row my-3">
                    <input type="text" className="form-control"
                        name="title" placeholder="Enter PropertyName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    {formik.errors.title && formik.touched.title && <div className='text-danger'>{formik.errors.title}</div>}
                </div>
                {!data?.typeFilter || !Array.isArray(data?.typeFilter) ?
                    <div className="row my-3">
                        <input type="text" className="form-control"
                            name="type" placeholder="Enter Type"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.type}
                        />
                        {formik.errors.type && formik.touched.type && <div className='text-danger'>{formik.errors.type}</div>}
                    </div> :
                    <div className="row my-3">
                        <select
                            className='form-select'
                            name='type'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">---SELECT TYPE----</option>
                            {data?.typeFilter?.map((item, index) => (
                                <option key={index} value={item} style={{ textTransform: "capitalize" }}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {formik.errors.type && formik.touched.type && <div className='text-danger'>{formik.errors.type}</div>}
                    </div>
                }

                <div className="row my-2">
                    <input type="text" className="form-control"
                        name="location" placeholder="Enter Location"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.location}
                    />
                    {formik.errors.location && formik.touched.location && <div className='text-danger'>{formik.errors.location}</div>}
                </div>
                <div className="row my-2">
                    <input type="number" className="form-control"
                        name="price" placeholder="Enter Price"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.errors.price && formik.touched.price && <div className='text-danger'>{formik.errors.price}</div>}
                </div>
                <div className="row my-2">
                    <input type="text" className="form-control"
                        name="image" placeholder="Enter Image Url"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.image}
                    />
                    {formik.errors.image && formik.touched.image && <div className='text-danger'>{formik.errors.image}</div>}
                </div>
                <div className="row my-2">
                    <textarea type="text" className="form-control"
                        name="short" placeholder="Enter Short Description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.short} rows={3}
                    ></textarea>
                    {formik.errors.short && formik.touched.short && <div className='text-danger'>{formik.errors.short}</div>}
                </div>
                <div className="row my-2">
                    <textarea type="text" className="form-control"
                        name="description" placeholder="Enter Description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description} rows={5}
                    />
                    {formik.errors.description && formik.touched.description && <div className='text-danger'>{formik.errors.description}</div>}
                </div>
                <div className="row my-3 justify-content-center">
                    <div className="col-auto">
                        <button type='submit' disabled={btn} style={{ opacity: btn ? "0.5" : "1" }} className="btn btn-primary p-2 m-1">{btn ?
                            <RotatingLines
                                visible={true}
                                height="30"
                                width="120"
                                color="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            : "Add Property"}</button>
                        <button className="btn btn-danger p-2 m-1">Reset</button>
                    </div>
                </div>
            </form>
        </>
    )
}