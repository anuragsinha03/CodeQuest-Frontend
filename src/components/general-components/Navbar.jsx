import { Link } from "react-router-dom";
function Navbar() {
	return (
		<nav className='flex items-center justify-center font-bold text-white text-2xl h-[10vh]'>
			<Link to='/'>CodeQuest</Link>
		</nav>
	);
}

export default Navbar;
