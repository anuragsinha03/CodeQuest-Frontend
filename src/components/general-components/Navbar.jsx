import { BsFillPersonFill } from "react-icons/bs";

import { Link } from "react-router-dom";
function Navbar() {
	return (
		<nav className='flex items-center justify-between font-bold px-[2rem] md:px-[4rem] text-white text-2xl h-[10vh] w-[98vw]'>
			<div>X</div>
			<Link to='/'>CodeQuest</Link>
			<BsFillPersonFill />
		</nav>
	);
}

export default Navbar;
