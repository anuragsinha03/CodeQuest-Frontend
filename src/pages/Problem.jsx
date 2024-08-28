import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import AceEditor from "react-ace";
import Navbar from "../components/general-components/Navbar";
import Languages from "../constants/Languages";
import Themes from "./../constants/Themes";
import "./../imports/AceBuildImports";
import { useParams, useNavigate } from "react-router-dom";

const CODEQUEST_WEBSOCKET_SERVICE_URL = import.meta.env
	.VITE_CODEQUEST_WEBSOCKET_SERVICE_URL;

const CODEQUEST_SUBMISSION_SERVICE_URL = import.meta.env
	.VITE_CODEQUEST_SUBMISSION_SERVICE_URL;

const CODEQUEST_PROBLEM_SERVICE_URL = import.meta.env
	.VITE_CODEQUEST_PROBLEM_SERVICE_URL;

function Problem() {
	const navigate = useNavigate();
	const { problemId } = useParams();
	const [code, setCode] = useState("");
	const [language, setLanguage] = useState("java");
	const [theme, setTheme] = useState("monokai");
	const [inputConsole, setInputConsole] = useState(false);
	const [status, setStatus] = useState("");
	const [output, setOutput] = useState("Run the code to get the output");
	const [testCases, setTestCases] = useState([]);
	const [problemTitle, setProblemTitle] = useState("");
	const [problemDescription, setProblemDescription] = useState("");
	const [socket, setSocket] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [connectionId, setConnectionId] = useState("");
	const userId = "1"; // Replace with actual user ID as needed

	useEffect(() => {
		const newSocket = io(CODEQUEST_WEBSOCKET_SERVICE_URL, {
			transports: ["websocket"],
		});

		newSocket.on("connect", () => {
			// console.log("Connected to the server with id: ", newSocket.id);
			setSocket(newSocket);
			newSocket.emit("setUserId", userId);
		});

		newSocket.on("connectionId", id => {
			// console.log("Received connectionId from server:", id);
			setConnectionId(id);
		});

		newSocket.on("submissionPayloadResponse", payload => {
			// console.log("Received payload from server:", payload);
			setStatus(payload.response.status);
			setOutput(payload.response.output);
		});

		// return () => {
		// 	newSocket.disconnect();
		// };
	}, []);

	useEffect(() => {
		async function fetchProblem() {
			try {
				const response = await axios.get(
					`${CODEQUEST_PROBLEM_SERVICE_URL}/api/v1/problems/${problemId}`
				);

				setCode(response.data.data.codeStubs[0].userSnippet);
				setProblemTitle(response.data.data.title);
				setProblemDescription(response.data.data.description);
				setTestCases(response.data.data.testCases);
			} catch (error) {
				console.error("Error fetching problem data:", error);
			}
		}

		fetchProblem();
	}, [problemId]);

	async function handleSubmission() {
		if (!socket.id) {
			console.error(
				"No connection ID. Ensure you are connected to the server."
			);
			return;
		}

		try {
			console.log("Submitting code:", code);
			console.log("Using language:", language);

			const token = localStorage.getItem("authToken");
			if (!token) {
				// console.log("Login before submitting");
				navigate("/login");
			}

			console.log(CODEQUEST_SUBMISSION_SERVICE_URL);
			// eslint-disable-next-line no-unused-vars
			const response = await axios.post(
				`${CODEQUEST_SUBMISSION_SERVICE_URL}/api/v1/submissions`,
				{
					code,
					language,
					userId: "1", // Use the same userId that was sent during socket connection
					problemId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setStatus("Pending...");
			setOutput("");
			// console.log("Submission response:", response.data);
			// The server will emit the submissionPayloadResponse event when the submission is processed
		} catch (error) {
			console.error("Error during submission:", error);
		}
	}

	return (
		<main className='flex flex-col items-center gap-[1.5rem] text-white bg-[#17153B] px-[2rem]'>
			<Navbar />
			<section className='flex flex-col md:flex-row items-center md:items-start gap-[1.5rem]'>
				<section className='flex flex-col md:max-w-[40vw]'>
					<div className='text-xl my-[1rem] font-semibold'>
						<ReactMarkdown
							rehypePlugins={[rehypeRaw]}
							className='prose'>
							{problemTitle.toUpperCase()}
						</ReactMarkdown>
					</div>
					<div className='flex flex-col gap-[2rem] md:h-[100vh] md:overflow-y-auto'>
						<div>
							<div className='font-semibold'>
								Problem Statement
							</div>
							<ReactMarkdown
								rehypePlugins={[rehypeRaw]}
								className='prose'>
								{problemDescription}
							</ReactMarkdown>
						</div>

						<div>
							<div className='font-semibold'>Test Cases:</div>
							{testCases.map((tc, index) => (
								<div
									key={index}
									className='mb-4'>
									<div>
										<strong>Input:</strong> {tc.input}
									</div>
									<div>
										<strong>Output:</strong> {tc.output}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className='flex flex-col gap-2 text-black md:max-w-[60vw]'>
					<div className='flex gap-[1rem]'>
						<select
							className='bg-[#433D8B] text-white p-2'
							value={language}
							onChange={e => setLanguage(e.target.value)}>
							{Languages.map(language => (
								<option
									key={language.value}
									value={language.value}>
									{language.languageName}
								</option>
							))}
						</select>

						<select
							className='bg-[#433D8B] text-white p-2'
							value={theme}
							onChange={e => setTheme(e.target.value)}>
							{Themes.map(theme => (
								<option
									key={theme.value}
									value={theme.value}>
									{theme.themeName}
								</option>
							))}
						</select>
					</div>

					<div className=''>
						<AceEditor
							mode={language}
							theme={theme}
							value={code}
							onChange={e => setCode(e)}
							name='codeEditor'
							style={{ maxWidth: "82vw", minWidth: "50vw" }}
							setOptions={{
								enableBasicAutocompletion: true,
								enableLiveAutocompletion: true,
								showLineNumbers: true,
								fontSize: 16,
							}}
						/>
					</div>

					<div className='flex justify-end gap-[1rem]'>
						<button className='bg-[#433D8B] text-white p-2 min-w-[5rem]'>
							Run
						</button>
						<button
							onClick={handleSubmission}
							className='bg-[#C8ACD6] font-semibold text-black p-2 min-w-[7rem]'>
							Submit
						</button>
					</div>

					<div className='text-white mb-5'>
						<div className='flex'>
							<button
								onClick={() => setInputConsole(false)}
								className={`font-semibold w-[10rem] h-[2rem] ${
									!inputConsole
										? "bg-[#C8ACD6] text-black "
										: "bg-[#17153B]"
								}`}>
								Output
							</button>
							<button
								onClick={() => setInputConsole(true)}
								className={`font-semibold w-[9rem] h-[2rem] ${
									inputConsole
										? "bg-[#C8ACD6] text-black"
										: "bg-[#17153B] text-white"
								}`}>
								Input
							</button>
						</div>

						{inputConsole ? (
							<textarea
								type='text'
								name=''
								id=''
								placeholder='write custom input...'
								className='font-semibold p-[1rem] bg-[#1E1C43] min-w-[82vw] min-h-[15vh] md:min-w-[50vw] md:min-h-[20vh]'
							/>
						) : (
							<div className='font-semibold p-[1rem] bg-[#1E1C43]  min-w-[82vw] min-h-[15vh] md:min-w-[40vw] md:min-h-[20vh]'>
								{testCases.length > 0 && (
									<div>INPUT: {testCases[0].input}</div>
								)}

								<div>{output}</div>
								<div
									className={`${
										status === "Pending..."
											? "text-white"
											: ""
									} ${
										status === "SUCCESS"
											? "text-green-500"
											: "text-red-500"
									}`}>
									{status}
								</div>
							</div>
						)}
					</div>
				</section>
			</section>
		</main>
	);
}

export default Problem;
