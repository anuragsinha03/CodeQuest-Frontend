import { Link, useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
	};

	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#17153B]'>
			<nav className='flex items-center justify-center font-bold px-[4rem] text-white text-2xl h-[10vh] w-[98vw]'>
				<Link to='/'>CodeQuest</Link>
			</nav>
			<section className='flex flex-col gap-[2rem] text-white text-center'>
				<div>
					<div className='font-light text-xl text-center'>
						404 Page Not Found!
					</div>
					<div>The page you are looking for is missing...</div>
				</div>

				<button
					onClick={handleClick}
					className='bg-[#C8ACD6] font-semibold text-black p-2 min-w-[7rem] rounded-lg'>
					GO HOME
				</button>
			</section>
		</main>
	);
}

export default NotFound;
