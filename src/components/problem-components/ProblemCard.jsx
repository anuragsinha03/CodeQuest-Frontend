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
		<tr className='flex justify-between border-b-[1px] py-[5px] px-[0.5rem] md:px-[2rem]'>
			<td className='hover:font-semibold'>
				<Link to={`/problems/${problem._id}`}>{problem.title}</Link>
			</td>
			<td className={`font-bold ${difficultyClass}`}>
				{problem.difficulty.toUpperCase()}
			</td>
		</tr>
	);
}

export default ProblemCard;
