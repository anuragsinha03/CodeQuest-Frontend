import { Link } from "react-router-dom";
function Navbar() {
	return (
		<nav className='font-bold text-center text-white text-2xl py-[1rem]'>
			<Link to='/'>CodeQuest</Link>
		</nav>
	);
}

export default Navbar;
