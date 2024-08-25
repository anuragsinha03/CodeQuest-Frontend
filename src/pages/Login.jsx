import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/general-components/Navbar";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = e => {
		e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);
		// API call to login
		navigate("/problems");
	};

	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#17153B]'>
			<Navbar />
			<section className='text-white  '>
				<form className='flex flex-col items-center gap-[2rem] font-light text-xl text-center'>
					<div className='flex flex-col gap-[0.5rem]'>
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
								to='/signup'>
								Create a new account
							</Link>
						</div>
					</div>

					<button
						onClick={handleLogin}
						className=' bg-[#C8ACD6] h-[3rem] w-[10rem] rounded-lg'>
						Login
					</button>
				</form>
			</section>
		</main>
	);
}

export default Login;
