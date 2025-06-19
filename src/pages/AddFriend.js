import { useState } from "react";
import { requestGetApi } from "../api/helperApi";
import { endPoint_user } from "../components/Params";

const AddFriend = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isvalid, setIsvalid] = useState(true);
    const [isAvailableUser, setIsAvailableUser] = useState(null);
    const [email, setEmail] = useState('');
    const [isAvailabelEmail, setIsAvailableEmail] = useState(null);

    const validasiPassword = (value) => {
        setIsvalid(value === password);
    }
   

    const validasiUsername = async (value) => {
        const res = await requestGetApi(endPoint_user + 'getByUsername/' + value);
        setIsAvailableUser(!res.success);
        console.log(res);
    }

    return (
        <div>
            <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                <div className="uk-margin">
                    <input className={isAvailableUser == null ? "uk-input" : (isAvailableUser ? "uk-input uk-form-success" : "uk-input uk-form-danger")} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} onBlur={(e) => validasiUsername(e.target.value)} />
                    <small>{isAvailableUser == null ? '' : (isAvailableUser ? 'Username Available' : 'Username has been taken')}</small>
                </div>
                <div className="uk-margin">
                    <input className="uk-input" type="email" placeholder="Email" />
                </div>
                <div className="uk-margin">
                    <input className="uk-input" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="uk-margin">
                    <input className={isvalid ? "uk-input" : "uk-input uk-form-danger"} type="password" placeholder="confirm password" onChange={(e) => validasiPassword(e.target.value)}  />
                </div>
                <button class="uk-button uk-button-primary">add</button>
            </div>

        </div>
    )
}

export default AddFriend;