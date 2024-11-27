import React, { useState } from 'react'
import * as Yup from "yup"

function FormWithYup() {

    const [formData, setFormData]= useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        country: "",
        interests: [],
        birthDate: "",
        age: "",
        gender: "",
        file: "",
        address: "",
        time: "",
    });

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is Required"),

        lastName: Yup.string().required("Last Name is Required"),

        email: Yup.string().required("Email is Required").email("Invalid email format"),

        phoneNumber:Yup.string()
        .matches(/^\d{10}$/,"Phone Number must be 10 digits")
        .required("Phone Number is Required"),

        password:Yup.string()
        .min(8,"Password must be at least 8 characters")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must be at least one symbol"
        )
        .matches(/[0-9]/,"Password must contain at least one number")
        .matches(/[A-Z]/,"Password must contain at least one uppercase letter")
        .matches(/[a-z]/,"Password must contain at least one lowercase letter")
        .required("Password is required"),

        confirmPassword:Yup.string()
        .oneOf([Yup.ref("password")],"Password must match")
        .required("Confirm password is required"),

        age: Yup.number()
        .typeError("Age must be number")
        .min(18, "You must be at least 18 years old")
        .max(100, "You canot be older than 100 years")
        .required("Age is required"),

        country: Yup.string().required("Country is required"),
        
        interests: Yup.array()
        .min(1, "Select at least one interest")
        .required("Select at least one interest"),

        birthDate: Yup.date().required("Date of birth is required"),

        gender: Yup.string()
        .required("Gender is required"),


        file: Yup.string().required("file is required"),

        address: Yup.string().required("address is required"),
        
        time: Yup.string().required("time is required"),
    })

    
    

    
    const handleSubmit = async (e) => {
        e.preventDefault();


       /* const nonParsed = {
        firstName: "Shubham",
        lastName: "Dixit",
        email: "shubhamdixit27198@gmail.com",
        phoneNumber: "9604924575",
        password: "Shubham@27",
        confirmPassword: "Shubham@27",
        gender: "Male",
        interests: ["coding"],
        birthDate: "1998-01-27",
        age: "26",
        file: "yes",
        address: "lohom",
        time: "5",
        };

        const parseUser = validationSchema.cast(nonParsed)

        console.log(nonParsed, parseUser);*/


        try {
            await validationSchema.validate(formData, {abortEarly: false});
            console.log("Form Sumbitted", formData);
            
        } catch (error) {
            const newErrors = {};

            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        } 
    };

    const handleChange =  (e) => {
        const {name, value} = e.target;
        
        

        setFormData({
            ...formData,
            [name]: value,
            
        });



    /*try {
            await validationSchema.validate(formData, {abortEarly: true});
            console.log("Form Sumbitted", formData);
        } catch (error) {
            const newErrors = {};

            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        } */


    };


    




    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        let updatedInterests = [...formData.interests];
        if(checked) {
            updatedInterests.push(name);
        } else {
            updatedInterests = updatedInterests.filter(
                (interest) => interest !== name
            );
        }

        setFormData({
            ...formData,
            interests: updatedInterests,
        });

    };




    /*const handleradioChange = (e) => {
        const {cast, checked} = e.target;
        let updatedgender = [...formData.gender];
        if(checked) {
            updatedgender.push(cast);
        } else {
            updatedgender = updatedgender.filter(
                (gender) => gender !== cast
            );
        }

        setFormData({
            ...formData,
            gender: updatedgender,
        });

    };*/




    return (
        <div className="container">
        <div className='form-div'>   
        <form onSubmit={handleSubmit}>
        
        <div className='thead'> <h1>Form Tags Table</h1> </div>
        
        <table> 
        <tbody>
        <tr>
            <td><label>First Name :</label></td>
            <td><input type='text' name='firstName'value={formData.firstName} placeholder='Enter your first name' onChange={handleChange} />{errors.firstName && <div className='error'>{errors.firstName}</div>}</td>
            <td><label>Last Name :</label></td>
            <td><input type='text' name='lastName' value={formData.lastName}  placeholder='Enter your last name'  onChange={handleChange} />{errors.lastName  && <div className='error'>{errors.lastName}</div>}</td>
        </tr> 
        <tr>
            <td><label>Email :</label></td>
            <td><input type='email' name='email' value={formData.email} placeholder='Enter your email' onChange={handleChange} />{errors.email && <div className='error'>{errors.email}</div>}</td>
            <td><label>Phone number :</label></td>
            <td><input type='text' name='phoneNumber' value={formData.phoneNumber} placeholder='Enter your number' onChange={handleChange} />{errors.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}</td>
        </tr>
        <tr>
            <td><label>Password :</label></td>
            <td><input type='password' name='password' value={formData.password} placeholder='Enter your password' onChange={handleChange} />{errors.password && <div className='error'>{errors.password}</div>}</td>
            <td><label>Confirm Password :</label></td>
            <td><input type='password' name='confirmPassword' value={formData.confirmPassword} placeholder='Enter your confirm password' onChange={handleChange} />{errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}</td>
        </tr>
        <tr>
            <td><label>Country :</label></td>
            <td>
                <select className='dropdownlist' name='country' value={formData.country} onChange={handleChange} >
                <option>Select</option>
                <option value="india">India</option>
                <option value="america">America</option>
                <option value="japan">Japan</option>
                </select>
                {errors.country && <div className='error'>{errors.country}</div>}
            </td>
            
            
            <td><label>Interests :</label></td>
            <td>
        <div className="checkbox">
            <label><input className='checkbox' type='checkbox' name='coding' checked={formData.interests.includes("coding")} onChange={handleCheckboxChange} />Coding</label>
            <label><input className='checkbox' type='checkbox' name='sports' checked={formData.interests.includes("sports")} onChange={handleCheckboxChange} />Sports</label>
            <label><input className='checkbox' type='checkbox' name='reading' checked={formData.interests.includes("reading")} onChange={handleCheckboxChange} />Reading</label>
        </div>
            {errors.interests && <div className='error'>{errors.interests}</div>}
            </td>
           
        </tr>
        
        <tr>
            <td><label>Date of Birth :</label></td>
            <td><input type='date' name='birthDate' value={formData.birthDate} placeholder='Enter your date of birth' onChange={handleChange} />{errors.birthDate && <div className='error'>{errors.birthDate}</div>}</td>
            <td><label>Age :</label></td>
            <td><input type='number' name='age' value={formData.age} placeholder='Enter your age' onChange={handleChange} />{errors.age && <div className='error'>{errors.age}</div>}</td>
        </tr> 

        <tr>
            <td><label>Gender :</label></td>
            <td>
        <div className="radio">   
        <label ><input className='radio' type="radio" name="gender" value="male"  onChange={handleChange}  />Male</label>   
        <label ><input className='radio' type="radio" name="gender" value="female"  onChange={handleChange}  />Female</label> 
         </div> 
                {errors.gender && <div className='error'>{errors.gender}</div>}
            </td>
            
            <td><label>File :</label></td>
            <td>
                <input className='file' type="file" name="file" size="30" onChange={handleChange}/>
                {errors.file && <div className='error'>{errors.file}</div>}
            </td>
        </tr>

        <tr>
            <td><label>Address :</label></td>
            <td>
                <textarea className='textarea' rows="3" cols="25" name="address" placeholder='Enter your address...' onChange={handleChange}></textarea>
                {errors.address && <div className='error'>{errors.address}</div>}
            </td>
            <td><label>Time :</label></td>
            <td>
                <input type="time" name="time" onChange={handleChange} />
                {errors.time && <div className='error'>{errors.time}</div>}
            </td>
        </tr>  
        
            
        </tbody>
        </table>
            <div> <button type='submit' class="btn" >Submit</button> </div>
        </form>
        </div> 
        </div>
    )
}

export default FormWithYup
