import './Register.scss'
import { useHistory } from "react-router-dom"
const Register = (props) => {
    let history = useHistory()
    const handleLogin = () => {
        history.push('./login')
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
                            <input type="text" className='form-control' placeholder='Email address ' />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="text" className='form-control' placeholder='User name ' />
                        </div>
                        <div className='form-group'>
                            <label>User name:</label>
                            <input type="text" className='form-control' placeholder='Phone number ' />
                        </div>

                        <div className='form-group'>
                            <label>Passowrd:</label>

                            <input type="password" className='form-control' placeholder='passwowd' />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type="text" className='form-control' placeholder='Re-enter password ' />
                        </div>
                        <button className='btn btn-primary'>Register</button>

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