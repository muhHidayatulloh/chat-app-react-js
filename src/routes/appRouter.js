import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ProtectedRoute from '../routes/ProtectedRoute';

import { Home, AddFriend, Portofolio, Friends, Chat } from '../pages';

const AppRouter = () => {
    return (
		<Router>
            <nav className="uk-navbar-container">
                <div className="uk-container">
                    <div uk-navbar="true">
                        <div className="uk-navbar-left">
                            <span className="uk-navbar-toggle uk-navbar-toggle-animate" uk-navbar-toggle-icon="true" ></span>
                            <div className="uk-navbar-dropdown">
                                <ul className="uk-nav uk-navbar-dropdown-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/friends">Friends</Link></li>
                                    <li><Link to="/portofolio">Portofolio</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='uk-container'>
                <div className='uk-margin'>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/friends"
                        element={
                            <ProtectedRoute>
                                <Friends />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat/:id"
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/addfriend" element={<AddFriend />} />
                    <Route path="/portofolio" element={<Portofolio />} />
                </Routes>
            </div>
		</Router>
	);
}

export default AppRouter;