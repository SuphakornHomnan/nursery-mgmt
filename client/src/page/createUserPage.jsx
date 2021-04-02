import React , { useState } from 'react'
import "bulma/css/bulma.css";
import "../scss/responsive-createUser.scss"
import { addUser } from '../redux/actions/user'
import { useDispatch } from 'react-redux'
const CreateUserPage = ({history}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [position, setPosition] = useState('accountant')
    const [owner, setOwner] = useState(null)
    function createUser() {
        dispatch(addUser(email, password, position, owner))
    }
    return (
        <div>
            <section className="loginColor">
                <div className="hero-body ">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop">
                                <form className="box">
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control has-icons-left">
                                            <input
                                                type="email"
                                                placeholder="Email..."
                                                className="input"
                                                onChange={({target})=> setEmail(target.value)}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left ">
                                            <input
                                                type="password"
                                                placeholder="Password..."
                                                className="input"
                                                onChange={({target})=> setPassword(target.value)}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Position</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select onChange={({target})=> setPosition(target.value)}>
                                                    <option value="accountant">นักบัญชี(Accountant)</option>
                                                    <option value="teacher">คุณครู(Teacher)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Owner</label>
                                        <div className="control has-icons-left ">
                                            <input
                                                type="text"
                                                placeholder="Owner..."
                                                className="input"
                                                onChange={({target})=> setOwner(target.value)}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-user-circle"></i>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                                <div className="field groupBtn">
                                    <button
                                        className="button is-success FontAll btnCreateUser"
                                        onClick={createUser}
                                    >
                                        สร้าง User
                                    </button>
                                    <button
                                        className="button is-danger FontAll btnCancel"
                                        onClick={() => history.push("/profilePage")}
                                    >
                                        ยกเลิก
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default CreateUserPage;