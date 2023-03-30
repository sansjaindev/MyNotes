import React, { useEffect, useState } from "react"
import Task from "./task";


function Home() {
	let savedItems = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
	const [tasks, setTasks] = useState(savedItems);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		setTasks([...tasks, { title, description }])
		setTitle('');
		setDescription('');
	}

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks])

	const deleteTask = (index) => {
		const newTasks = tasks.filter((val, i) => {
			console.log(val);
			return i !== index;
		})

		setTasks(newTasks);
	}

	return (
		<div className="container">
			<h1>QuickNotes</h1>

			<form onSubmit={ submitHandler }>
				<input 
					type="text"
					placeholder="Title"
					value={title}
					onChange = {(e) => setTitle(e.target.value)}
				/>

				<textarea
					placeholder="Description"
					value={description}
					onChange = {(e) => setDescription(e.target.value)}
				></textarea>
				
				<button type="submit">ADD</button>
			</form>
			
			{tasks.map((item, index) => (
				<Task
					key = { index }
					title = { item.title }
					description = { item.description }
					deleteTask = { deleteTask }
					index = { index }
				/>
      		))}
		</div >
	)
}

export default Home;