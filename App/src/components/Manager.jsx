import React, { useEffect, useRef, useState } from 'react'
import eye from '../assets/eye.svg'
import eyeOff from '../assets/eyeOff.svg'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "https://cdn.lordicon.com/lordicon.js";
import axios from "axios";


const Manager = () => {
    const [passwordArray, setPasswordArray] = useState([]);
    const [form, setForm] = useState({ site: "", uname: "", password: "" });
    const passRef = useRef();

    useEffect(() => {
        async function fetcher() {
            let allPasswords = await axios.get("http://localhost:3000/")
            setPasswordArray(allPasswords.data)
        }
        fetcher();
    }, [])

    const eyeChange = (e) => {
        e.target.src = e.target.src == eyeOff ? eye : eyeOff
        passRef.current.type = passRef.current.type == "password" ? "text" : "password"
    }

    const formChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const addPass = async () => {
        if (form.site.length > 1 && form.uname.length > 1 && form.password.length > 1) {
            let res = await axios.post("http://localhost:3000/", form)
            setPasswordArray([...passwordArray, res.data])
            setForm({ site: "", uname: "", password: "" })
            toast.success('Password Added', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else {
            toast.warn('Data limit not satisfied', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }

    }
    const deletePass = async (id) => {
        try {
            const conf = confirm("Do you want to Delete this?")
            if (conf) {
                setPasswordArray(passwordArray.filter((value) => value._id != id))
                let res = await axios.delete(`http://localhost:3000/${id}`)
                toast('Password Deleted', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (err) {
            console.log(err)
            console.log("error deleting password")

        }

    }
    const editPass = async(id,index) => {
        setForm(passwordArray[index])
        setPasswordArray(passwordArray.filter((value) => value._id != id))
                let res = await axios.delete(`http://localhost:3000/${id}`)

    }
    return (
        <div><ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
        />
            <div className='text-white min-h-[88vh] flex justify-center'>
                <div className='md:min-w-2xl flex flex-col items-center  gap-3 m-2'>
                    <p>Password manager</p>
                    <input placeholder='Enter Url or Application name' name='site' type="text" value={form.site} onChange={formChange} className='bg-gray-100 w-1/2 md:w-1/2 placeholder-gray-400 text-gray-800 p-1 m-1 rounded-lg' />
                    <div className='flex items-center justify-between gap-2'>
                        <input type="text" placeholder='Enter Username' name='uname' value={form.uname} onChange={formChange} className='bg-gray-100 w-1/2 placeholder-gray-400 text-gray-800 p-1 m-1 rounded-lg' />
                        <div className="flex w-1/2 relative">

                            <input ref={passRef} type="password" placeholder='Enter Password' name='password' value={form.password} onChange={formChange} className='bg-gray-100  placeholder-gray-400 text-gray-800 p-1 m-1 rounded-lg' />
                            <img src={eye} onClick={eyeChange} alt="eye" className='absolute right-2 top-1/4 hover:scale-110' />
                        </div>
                    </div>
                    <div className="submit">
                        <input type="submit" value="Save Password" onClick={addPass} className='bg-blue-900 p-2 rounded-2xl text-bold hover:bg-blue-700 active:bg-blue-800' />
                    </div>
                    <div className="table">
                        {passwordArray.length == 0 ? <div>No Passwords to show</div> :
                            <div>
                                <div className='text-gray-500 text-lg m-4 ml-7'>Your Passwords</div>

                                <div className='p-2  mb-7 bg-blue-950/10 rounded-lg'>
                                    <table className='max-w-lg '>
                                        <thead>
                                            <tr className='border-b-2 border-amber-50'>
                                                <th className='text-bold p-1 px-5 max-w-1/2 '>Site Name</th>
                                                <th className='text-bold p-1 px-5 max-w-1/4'>Username</th>
                                                <th className='text-bold p-1 px-5 max-w-1/4'>Password</th>
                                                <th className='text-bold p-1 px-5'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {passwordArray.map((passwd, index) => {
                                                return (<tr key={index}>
                                                    <td className='text-center p-1 max-w-2xs xl:max-w-xl truncate '><a href={passwd.site} target="_blank" rel="noopener noreferrer">{passwd.site}</a></td>
                                                    <td className='text-center p-1 max-w-2xs  truncate'>{passwd.uname}</td>
                                                    <td className='text-center p-1 max-w-2xs truncate' >{passwd.password}</td>
                                                    <td className='flex gap-2.5 justify-center'>
                                                        <button onClick={() => { editPass(passwd._id,index) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/nwfpiryp.json"
                                                                trigger="hover"
                                                                state="hover-line"
                                                                colors="primary:#fae6d1,secondary:#66a1ee,tertiary:#9ce5f4,quaternary:#ffffff"
                                                                style={{ "width": "25px", "height": "25px" }} >
                                                            </lord-icon></button>
                                                        <button onClick={() => { deletePass(passwd._id) }}><lord-icon
                                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                                            trigger="hover"
                                                            state="hover-line"
                                                            colors="primary:#fae6d1,secondary:#66a1ee,tertiary:#9ce5f4,quaternary:#ffffff"
                                                            style={{ "width": "25px", "height": "25px" }} >
                                                        </lord-icon></button>
                                                    </td>
                                                </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager
