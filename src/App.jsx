import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Problem from "./pages/Problem";
import SampleProblem from "./constants/SampleProblem";
import ProblemsCatalogue from "./pages/ProblemsCatalogue";

function App() {
	const markdownText = SampleProblem.problemStatement;

	return (
		<>
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
					element={<ProblemsCatalogue />}></Route>
				<Route
					path='/problems/:problemId'
					element={
						<Problem descriptionText={markdownText} />
					}></Route>
			</Routes>
		</>
	);
}

export default App;

