/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ProblemCard({ problem }) {
	let difficultyClass = "";
	if (problem.difficulty === "easy") {
		difficultyClass = "text-green-500";
	} else if (problem.difficulty === "medium") {
		difficultyClass = "text-yellow-500";
	} else if (problem.difficulty === "hard") {
		difficultyClass = "text-red-500";
	}

	return (
		<tr className='border-b-[1px]'>
			<Link
				to={`http://localhost:5173/problems/${problem._id}`}
				className='flex justify-between rounded-lg py-[2px]'>
				<div>{problem.title}</div>
				<div className={`font-semibold ${difficultyClass}`}>
					{problem.difficulty.toUpperCase()}
				</div>
			</Link>
		</tr>
	);
}

export default ProblemCard;
