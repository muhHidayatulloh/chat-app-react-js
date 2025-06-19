import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import Login from '../auth/login';
import { requestGetApi } from '../api/helperApi';
import { endPoint_conversation, endPoint_user } from '../components/Params';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
const Home = () => {
	const { user, logout } = useAuth();
	const [conversations, setConversations] = useState([]);
	const [friends, setFriends] = useState([]);

	const fetchConversations = async () => {
		try {
			const res = await requestGetApi( endPoint_conversation + user.id);
			if(res) {
				setConversations(res);
			}
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};


    const fetchUsers = async () => {
        try {
            const res = await requestGetApi(endPoint_user);
            setFriends(res);
        } catch (error) {
            console.error(error);
        }
    }

	const changeFriends = (event) => {
		event.stopPropagation();
		console.log('sfdsjdhfjsdf');
	}

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		fetchConversations();
		fetchUsers();
	}, []);

	return (
		<>
			<div className='uk-container'>
				<div>
					{user ? (
						<div>
							<h1>Welcome to the Home Page, {user.name}!</h1>
							<button className="uk-button uk-button-default uk-button-small" uk-toggle="target: #my-id">New Chat</button> 
							<br />
							<button onClick={logout}>Logout</button>
						</div>
					) : (
						<Login />
					)}
				</div>
				
			</div>
			
			{/* this is the modal */}
			<div id="my-id" uk-modal="true" className='uk-modal'>
				<div className="uk-modal-dialog">
					<button className="uk-modal-close-default" type="button" uk-close="true"></button>
					<div className="uk-modal-header">
						<h2 className="uk-modal-title">Contact</h2>
					</div>
					<div className="uk-modal-body">
						<div className="uk-container">
							<div className="uk-margin">
								{friends.map((friend) => (
									<article className="uk-comment" key={friend.id} onClick={changeFriends}>
										<header className="uk-comment-header">
											<div className="uk-grid-medium uk-flex-middle" uk-grid="true">
												<div className="uk-width-auto">
													<img className="uk-comment-avatar" src={"/images/avatar/" + friend.profile_picture_url} width="50" height="80" alt="" />
												</div>
												<div className="uk-width-expand" >
													<h4 className="uk-comment-title uk-margin-remove"><span className="uk-link-reset" >{friend.display_name}</span></h4>
													<ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
														<li>Contoh pesan</li>
													</ul>
												</div>
												<span className='flaging'></span>
											</div>
										</header>
									</article>
								))}
							</div>
						</div>
					</div>
					<div className="uk-modal-footer uk-text-right">
						<Link to="/addfriend">
							<button className="uk-button uk-button-primary"><Icon name="plus" /></button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
