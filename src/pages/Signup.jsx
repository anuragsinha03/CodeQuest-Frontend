import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = e => {
		e.preventDefault();
		console.log("Name:", name);
		console.log("Email:", email);
		console.log("Password:", password);
		// API call to login
		navigate("/login");
	};

	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#17153B]'>
			<nav className='flex items-center justify-center font-bold px-[4rem] text-white text-2xl h-[10vh] w-[98vw]'>
				<Link to='/'>CodeQuest</Link>
			</nav>
			<section className='text-white'>
				<form className='flex flex-col items-center gap-[2rem] font-light text-xl text-center'>
					<div className='flex flex-col gap-[0.5rem]'>
						<div className='flex flex-col'>
							<p className=' text-sm text-left'>Name</p>
							<input
								className='p-[10px] rounded-lg bg-[#433D8B]'
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder='John Doe'
							/>
						</div>

						<div className='flex flex-col'>
							<p className=' text-sm text-left'>Email</p>
							<input
								className='p-[10px] rounded-lg bg-[#433D8B]'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder='example@xyz.com'
							/>
						</div>

						<div className='flex flex-col'>
							<p className=' text-sm text-left'>Password</p>
							<input
								className='p-[10px] rounded-lg bg-[#433D8B]'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder='**********'
							/>
							<Link
								className='text-sm font-bold text-left'
								to='/login'>
								Already registered? Login
							</Link>
						</div>
					</div>

					<button
						onClick={handleLogin}
						className='bg-[#C8ACD6] text-black/80 hover:text-black font-semibold h-[3rem] w-[15rem] rounded-lg'>
						Register
					</button>
				</form>
			</section>
		</main>
	);
}

export default Signup;
