import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(prev => !prev);
	};

	const handleLogout = () => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			console.log("No user is logged in");
			navigate("/login");
			return;
		}

		localStorage.clear(token);
		console.log("Logged out!");
		navigate("/login");
	};

	return (
		<nav className='relative flex items-center justify-between font-bold px-[2rem] md:px-[4rem] text-white text-2xl h-[10vh] w-[98vw]'>
			<div>X</div>
			<Link to='/'>CodeQuest</Link>
			<div className='relative'>
				<BsFillPersonFill
					onClick={toggleDropdown}
					className='cursor-pointer'
				/>
				{dropdownOpen && (
					<div className='absolute right-0 mt-2 w-[150px] bg-[#433D8B] shadow-lg rounded-lg text-white z-50'>
						<ul className='flex flex-col text-sm font-light '>
							<li className='px-4 py-2 hover:bg-[#5754a6] hover:rounded-t-lg '>
								<Link to='/profile'>Profile</Link>
							</li>
							<li className='px-4 py-2 hover:bg-[#5754a6]'>
								<Link to='/settings'>Settings</Link>
							</li>
							<li className='px-4 py-2 border-t-[1px] hover:bg-[#5754a6] hover:rounded-b-lg '>
								<button onClick={handleLogout}>Logout</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
