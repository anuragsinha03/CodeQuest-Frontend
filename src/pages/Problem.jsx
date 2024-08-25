import { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import AceEditor from "react-ace";
import Navbar from "../components/general-components/Navbar";
import Languages from "../constants/Languages";
import Themes from "./../constants/Themes";
import "./../imports/AceBuildImports";

// eslint-disable-next-line react/prop-types
function Problem({ descriptionText }) {
	const sanitizedMarkdown = DOMPurify.sanitize(descriptionText);

	const [code, setCode] = useState("");
	const [language, setLanguage] = useState("java");
	const [theme, setTheme] = useState("monokai");

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
					problemId: "66bf607ab427c4f285104958",
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
				<section className='flex flex-col md:max-w-[50vw]'>
					<div className='text-xl font-semibold'>688. Two Sum</div>
					<div className=''>
						<ReactMarkdown
							rehypePlugins={[rehypeRaw]}
							className='prose'>
							{sanitizedMarkdown}
						</ReactMarkdown>
					</div>
				</section>
				<section className='flex flex-col gap-2 h-screen text-black'>
					<div className='flex gap-[2rem]'>
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
				</section>
			</section>
		</main>
	);
}

export default Problem;
