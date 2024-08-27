import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./../auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async e => {
		e.preventDefault();
		// console.log("Email:", email);
		// console.log("Password:", password);

		// API call to login
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const token = userCredential.user.accessToken;
			localStorage.setItem("authToken", token);
			// console.log(token);

			navigate("/problems");
		} catch (error) {
			console.error("Error logging you in: ", error.code, error.message);
			setError(error.message);
		}
	};

	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#17153B]'>
			<nav className='flex items-center justify-center font-bold px-[4rem] text-white text-2xl h-[10vh] w-[98vw]'>
				<Link to='/'>CodeQuest</Link>
			</nav>
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

					{error && (
						<p className='text-red-500 text-sm text-center'>
							{error}
						</p>
					)}

					<button
						onClick={handleLogin}
						className=' bg-[#C8ACD6] text-black/90 hover:text-black font-semibold h-[3rem] w-[15rem] rounded-lg'>
						Login
					</button>
				</form>
			</section>
		</main>
	);
}

export default Login;
