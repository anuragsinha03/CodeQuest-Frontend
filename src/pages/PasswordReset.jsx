/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function PasswordReset() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);

	const handlePasswordReset = async () => {
		const auth = getAuth();
		try {
			await sendPasswordResetEmail(auth, email);
			setMessage("Password reset link sent! Check your email.");
			setError(null);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			setMessage("");
			setError("Failed to reset the password. Please try again.");
		}
	};

	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#17153B]'>
			<nav className='flex items-center justify-center font-bold px-[4rem] text-white text-2xl h-[10vh] w-[98vw]'>
				<Link to='/'>CodeQuest</Link>
			</nav>
			<section className='text-white'>
				<div className='flex flex-col items-center gap-[1rem] font-light text-xl text-center'>
					<div>
						<div className='text-xl font-semibold'>
							Forgot your password?
						</div>
						<p className='text-sm'>No worries, we got you!</p>
					</div>

					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Enter your email'
						required
						className='p-[10px] rounded-lg bg-[#433D8B]'
					/>
					<button
						onClick={handlePasswordReset}
						className='bg-[#C8ACD6] font-semibold text-black/80 hover:text-black h-[3rem] w-[15rem] rounded-lg'>
						Send Link
					</button>

					<Link
						to='/login'
						className='text-sm font-bold text-left'>
						Back to Login
					</Link>

					{message && (
						<p className='text-sm md:text-lg text-green-500'>
							{message}
						</p>
					)}
					{error && (
						<p className='text-sm md:text-lg text-red-500'>
							{error}
						</p>
					)}
				</div>
			</section>
		</main>
	);
}

export default PasswordReset;
