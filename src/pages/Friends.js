import { useEffect, React, useState } from "react";
import { Link } from "react-router-dom";
import { encryptId } from "../utils/cryptoUtils";
import { endPoint_user } from '../components/Params';
import { requestGetApi } from "../api/helperApi";
const Friends = () => {
    const [friends, setFriends] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await requestGetApi(endPoint_user);
            setFriends(res);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="uk-container">
                <div className="uk-margin">
                    {friends.map((friend) => (
                        <article className="uk-comment" key={friend.id}>
                            <header className="uk-comment-header">
                                <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                                    <div className="uk-width-auto">
                                        <img className="uk-comment-avatar" src={"/images/avatar/" + friend.profile_picture_url} width="50" height="80" alt="" />
                                    </div>
                                    <Link to={'/chat/' + encryptId(friend.id)} className="uk-width-expand">
                                        <h4 className="uk-comment-title uk-margin-remove"><span className="uk-link-reset" >{friend.display_name}</span></h4>
                                        <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                            <li>Contoh pesan</li>
                                        </ul>
                                    </Link>
                                </div>
                            </header>
                        </article>
                    ))}
                  
                </div>
            </div>

        </>
    );
};

export default Friends;