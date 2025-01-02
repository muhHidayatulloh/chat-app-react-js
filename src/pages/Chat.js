import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { requestGetApi, requestPostApi } from '../api/helperApi';
import { useAuth } from '../auth/useAuth';
import { decryptId } from '../utils/cryptoUtils';
import { endPoint_user, endPoint_conversation, endPoint_messages } from '../components/Params';

const socket = io.connect('http://localhost:8000/'); // Koneksi ke backend

const Chat = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const [friend, setFriends] = useState([]);
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const [isConnected, setIsConnected] = useState(false);
	const [conversation, setConversation] = useState({});
	const [members, setMembers] = useState([]);
	const fetchUser = async (id) => {
		const res = await requestGetApi(endPoint_user + id);
		setFriends(res);
		// setIsConnected(res.is_online);
	};

	// add conversionrs	
	const addConversation = async (member_id) => {
		const created_by = user.id;
		const conversation_type = 'private';
		const res = await requestPostApi( endPoint_user + 'add', {created_by, conversation_type, member_id});
		setConversation(res.conversation);
		setMembers(res.members);
	};

	const getConversationsByUserIdAndMemberId = async (user_id, member_id) => {
		const res = await requestGetApi( endPoint_conversation + user_id + '/' + member_id);
		if(res) {
			setConversation(res);
			console.log(res, 'get conversation');
			if(res.members) {
				setMembers(res.members[0]);
			}
		} else {
			addConversation(member_id);
		}

		getMessage();
	};

	const getMessage = () => {
		console.log(conversation, 'get message');
	}
	

	useEffect(() => {
		
		fetchUser(decryptId(id));

		getConversationsByUserIdAndMemberId(user.id, decryptId(id));


		if (socket) {
			console.log('Socket is already connected');
			setIsConnected(socket.connected);
		}

		// memgecek koneski ke server
		socket.on('connect', () => {
			console.log('Connected to server');
			setIsConnected(true);
		});

		// memeriksa koneksi gagal pada socket
		socket.on('connect_error', (err) => {
			console.log('Connection error', err);
			setIsConnected(false);
		});

		// Event listener untuk koneksi terputus
		socket.on('disconnect', () => {
			console.log('Disconnected from server');
			setIsConnected(false); // Menandakan bahwa koneksi terputus
		});

		// Menerima pesan dari server
		socket.on('message', (data) => {
			setMessageList((prevList) => [...prevList, data]);
		});

		return () => {
			console.log('Cleaning up socket listeners...');
			socket.off('message'); // Bersihkan listener saat komponen di-unmount
			socket.off('connect');
			socket.off('connect_error');
			socket.off('disconnect');
		};
	}, [id]);

	const handleSendMessage = () => {

		if (!isConnected) {
			alert('Koneksi ke server gagal. Silahkan coba lagi. ');
			return;
		}
		
		console.log('Sending message', message);
		// Emit pesan ke server
		socket.emit('message', {
			text: message,
			align: 'right',
			time: new Date().toLocaleTimeString(),
		});
		setMessage(''); // Reset input setelah mengirim pesan
	};

	// const handleReceiveMessage = () => {
	// 	setMessages([...messages, { text: 'Halo, apa kabar?', align: 'left' }]);
	// };

	return (
		<>
			<div className="info-profile">
				<div className="uk-grid-medium uk-flex-middle" uk-grid="true">
					<div className="uk-width-auto">
						<img className="uk-comment-avatar" src={"/images/avatar/" + friend.profile_picture_url} width="50" height="80" alt="" />
					</div>
					<div className="uk-width-expand">
						<h4 className="uk-comment-title uk-margin-remove"><span className="uk-link-reset" >{friend.display_name}</span></h4>
						<ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
							<li>{friend.is_online ? 'Online' : 'Offline'}</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='uk-container'>
				<div className="chat-container">
					<div className="chat-box">
						{messageList.map((message, index) => (
							<div key={index} className={`message ${message.align}`}>
								{message.text}
							</div>
						))}
					</div>
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Ketik pesan..."
						className="chat-input"
					/>
					<button onClick={handleSendMessage} className='chat-button'>Kirim</button>
				</div>
			</div>

		</>
	);
};

export default Chat;