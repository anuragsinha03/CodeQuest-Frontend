import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/general-components/Navbar";

function Home() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/login");
	};
	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#17153B]'>
			<nav className='flex items-center justify-center font-bold px-[4rem] text-white text-2xl h-[10vh] w-[98vw]'>
				<Link to='/'>CodeQuest</Link>
			</nav>
			<section className='text-white'>
				<div className='flex flex-col items-center gap-[1rem] font-light text-xl text-center'>
					Elevate Your Coding Skills with CodeQuest
					<button
						onClick={handleClick}
						className='bg-[#C8ACD6] font-semibold text-black/80 hover:text-black h-[3rem] w-[15rem] rounded-lg'>
						Start Coding!
					</button>
				</div>
			</section>
		</main>
	);
}

export default Home;
