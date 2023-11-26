import './Register.scss'
import { useHistory } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { registerNewUser } from "../../services/userService"

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cofirmPassword, setConfirmPassword] = useState("")
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    let history = useHistory()
    const handleLogin = () => {
        history.push('./login')
    }
    useEffect(() => {
        // axios.get("http://localhost:8080/api/v1/test-api").then(data => {
        //     console.log("check ", data)
        // })

    }, []);

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            toast.error("Email is required")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error("please enter a vailid email address")
            return false
        }
        if (!phone) {
            toast.error("Phone is required")
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
            return false
        }
        if (!password) {
            toast.error("Password is required")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            return false
        }
        if (password != cofirmPassword) {
            toast.error('Your password is not the sam')
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            return false
        }

        return true
    }

    const handleRegister = async () => {
        let check = isValidInputs()

        if (check === true) {

            let serverData = await registerNewUser(email, phone, username, password)

            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push('./login')

            } else {
                toast.error(serverData.EM)
            }
        }

    }
    return (
        <div className="Register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            Tran Quoc Loc
                        </div>
                        <div className="detail">
                            Tran Quoc Loc helps you connect and share with the people in your life
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            Tran Quoc Loc
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="text" className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address '
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="text" className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='User name '
                                value={phone} onChange={(event) => setPhone(event.target.value)}

                            />
                        </div>
                        <div className='form-group'>
                            <label>User name:</label>
                            <input type="text" className='form-control' placeholder='Phone number '
                                value={username} onChange={(event) => setUsername(event.target.value)}

                            />
                        </div>

                        <div className='form-group'>
                            <label>Passowrd:</label>

                            <input type="password" className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='passwowd'
                                value={password} onChange={(event) => setPassword(event.target.value)}

                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type="password" className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Re-enter password '
                                value={cofirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}

                            />
                        </div>
                        <button className='btn btn-primary'
                            type='button' onClick={() => handleRegister()}>
                            Register
                        </button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an account Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register