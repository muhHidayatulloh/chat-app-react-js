import React from 'react';
import { useAuth } from '../auth/useAuth';
import Login from '../auth/login';

const Home = () => {
	const { user, logout } = useAuth();

	return (
		<>
			<div className='uk-container'>
				<div>
					{user ? (
						<div>
							<h1>Welcome to the Home Page, {user.name}!</h1>
							<button onClick={logout}>Logout</button>
						</div>
					) : (
						<Login />
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
