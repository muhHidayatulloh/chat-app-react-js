import React from "react";
import { useAuth } from "../auth/useAuth";
import Login from "../auth/login";

const User = () => {
    const { user, logout } = useAuth();

    return (
        <>
            <div>
                {user ? (
                    <div>
                        <h1>Welcome, {user.name}!</h1>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <Login />
                )}
            </div>
        </>
    );
};

export default User;