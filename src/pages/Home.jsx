import { useNavigate } from "react-router-dom";
import Navbar from "../components/general-components/Navbar";

function Home() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/login");
	};
	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#17153B]'>
			<Navbar />
			<section className='text-white'>
				<div className='flex flex-col items-center gap-[1rem] font-light text-xl text-center'>
					Elevate Your Coding Skills with CodeQuest
					<button
						onClick={handleClick}
						className='bg-[#C8ACD6] h-[3rem] w-[10rem] rounded-lg'>
						Start Coding!
					</button>
				</div>
			</section>
		</main>
	);
}

export default Home;
