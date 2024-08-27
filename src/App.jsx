import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Problem from "./pages/Problem";
import ProblemsCatalogue from "./pages/ProblemsCatalogue";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route
						path='/'
						element={<Home />}></Route>
					<Route
						path='/login'
						element={<Login />}></Route>
					<Route
						path='/signup'
						element={<Signup />}></Route>
					<Route
						path='/problems'
						element={
							<PrivateRoute>
								<ProblemsCatalogue></ProblemsCatalogue>
							</PrivateRoute>
						}></Route>
					<Route
						path='/problems/:problemId'
						element={
							<PrivateRoute>
								<Problem></Problem>
							</PrivateRoute>
						}></Route>
				</Routes>
			</AuthProvider>
		</>
	);
}

export default App;

