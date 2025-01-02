import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Friends from '../pages/Friends';
import Chat from '../pages/Chat';
// import User from './pages/User';
import ProtectedRoute from '../routes/ProtectedRoute';

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
                </Routes>
            </div>
		</Router>
	);
}

export default AppRouter;