/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Navbar from "../components/general-components/Navbar";
import axios from "axios";
import ProblemCard from "../components/problem-components/ProblemCard";

function ProblemsCatalogue({ currentUser }) {
	const [problems, setProblems] = useState([]);
	const userName = currentUser.displayName.split(" ")[0];

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
			<section className='flex flex-col gap-[1rem] p-[2rem] text-white h-[90vh] bg-[#17153B]'>
				{/* <div className='text-xl font-semibold'>All Problems</div> */}
				<div className='flex justify-evenly flex-col-reverse gap-[2rem] md:flex-row'>
					<table className='flex rounded-lg flex-col gap-2 md:w-[50vw] h-[50vh] md:h-[75vh] overflow-y-auto'>
						<thead className='border-b-[1px] py-[5px] px-[0.5rem] md:px-[2rem] bg-[#433D8B] flex justify-between font-bold'>
							<tr className='w-[100%] flex justify-between'>
								<th>PROBLEMS</th>
								<th>DIFFICULTY</th>
							</tr>
						</thead>
						<tbody className='flex flex-col'>
							{problems.map((problem, index) => (
								<ProblemCard
									key={index}
									problem={problem}
								/>
							))}
						</tbody>
					</table>

					<div className='md:w-[50vw]'>
						<div className='flex flex-col items-center md:h-[100%]'>
							<p className='text-center text-2xl'>
								Hey, {userName}
							</p>
							<p>Lets practice!</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default ProblemsCatalogue;
