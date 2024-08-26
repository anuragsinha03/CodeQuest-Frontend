import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import AceEditor from "react-ace";
import Navbar from "../components/general-components/Navbar";
import Languages from "../constants/Languages";
import Themes from "./../constants/Themes";
import "./../imports/AceBuildImports";
import { useParams } from "react-router-dom";

function Problem() {
	const { problemId } = useParams();

	//const sanitizedMarkdown = DOMPurify.sanitize(descriptionText);

	const [code, setCode] = useState("");
	const [language, setLanguage] = useState("java");
	const [theme, setTheme] = useState("monokai");
	const [inputConsole, setInputConsole] = useState(false);
	const [problemTitle, setProblemTitle] = useState("");
	const [problemDescription, setProblemDescription] = useState("");

	useEffect(() => {
		async function fetchProblem() {
			try {
				const response = await axios.get(
					`http://localhost:3001/api/v1/problems/${problemId}`
				);

				setCode(response.data.data.codeStubs[0].userSnippet);
				setProblemTitle(response.data.data.title);
				setProblemDescription(response.data.data.description);
			} catch (error) {
				console.error("Error fetching problem data:", error);
			}
		}

		fetchProblem();
	}, [problemId]);

	async function handleSubmission() {
		try {
			console.log(code);
			console.log(language);
			const response = await axios.post(
				"http://localhost:3000/api/v1/submissions",
				{
					code,
					language,
					userId: "1",
					problemId: problemId,
					// problemId: "66bf607ab427c4f285104958",
				}
			);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
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
					<div className='md:h-[100vh] md:overflow-y-auto'>
						<div className='font-semibold'>Problem Statement</div>
						<ReactMarkdown
							rehypePlugins={[rehypeRaw]}
							className='prose'>
							{problemDescription}
						</ReactMarkdown>
					</div>
				</section>
				<section className='flex flex-col gap-2 text-black'>
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
								className='font-semibold p-[1rem] placeholder-black  text-black bg-[#C8ACD6] min-w-[82vw] min-h-[15vh] md:min-w-[50vw] md:min-h-[20vh]'
							/>
						) : (
							<div className='font-semibold p-[1rem] text-black bg-[#C8ACD6] min-w-[82vw] min-h-[15vh] md:min-w-[40vw] md:min-h-[20vh]'>
								Run the code to get the output
							</div>
						)}
					</div>
				</section>
			</section>
		</main>
	);
}

export default Problem;
