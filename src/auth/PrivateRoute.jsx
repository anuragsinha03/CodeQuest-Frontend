import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
	const { currentUser } = useAuth();
	console.log(currentUser);

	if (currentUser) {
		return React.cloneElement(children, { currentUser });
	} else {
		return <Navigate to='/login' />;
	}
};

export default PrivateRoute;
