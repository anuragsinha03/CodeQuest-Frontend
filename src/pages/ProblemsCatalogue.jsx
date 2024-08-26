import { useEffect, useState } from "react";
import Navbar from "../components/general-components/Navbar";
import axios from "axios";
import ProblemCard from "../components/problem-components/ProblemCard";

function ProblemsCatalogue() {
	const [problems, setProblems] = useState([]);

	useEffect(() => {
		async function fetchAllProblems() {
			try {
				const response = await axios.get(
					"http://localhost:3001/api/v1/problems"
				);

				setProblems(response.data.data);
			} catch (err) {
				console.error("Error fetching all problems:", err);
			}
		}

		fetchAllProblems();
	}, []);

	return (
		<main className='bg-[#17153B]'>
			<Navbar />
			<section className='flex flex-col gap-[1rem] px-[2rem] text-white h-screen bg-[#17153B]'>
				<div className='text-xl font-semibold'>All Problems</div>
				<table className='flex flex-col gap-2'>
					<tr className='border-b-[1px] bg-[#433D8B] flex justify-between font-bold'>
						<th>PROBLEMS</th>
						<th>DIFFICULTY</th>
					</tr>
					{problems.map((problem, index) => (
						<ProblemCard
							key={index}
							problem={problem}
						/>
					))}
				</table>
			</section>
		</main>
	);
}

export default ProblemsCatalogue;
