import React, { Component } from 'react'

class AppDragDropDemo extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [{
					name: "Learn Angular", 
					category: "wip",
					bgcolor: "yellow"
				},
				{
					name: "React",
					category: "wip",
					bgcolor: "pink"
				},
				{
					name: "Vue",
					category: "complete",
					bgcolor: "skyblue"
				}
			]
		}
	}

	onDragOver(ev) {
		ev.preventDefault();
	}

	onDragStart(ev, id) {
		console.log('dragstart: ', id);
		ev.dataTransfer.setData("id", id);
	}

	onDrop(ev, cat) {
		let id = ev.dataTransfer.getData("id");

		let tasks = this.state.tasks.filter((task) => {
			if (task.name == id) {
			    task.category = cat;           
			}              
			return task;       
		});

		this.setState({
			tasks: tasks
		});   
	}

	render() {
		let tasks = {
			wip: [],
			complete: []
		};

		this.state.tasks.forEach( (t) => {
			tasks[t.category].push(
				<div key={t.name}
					onDragStart = {(e) => this.onDragStart(e, t.name)}
					draggable
					className="draggable"
					style={{backgroundColor: t.bgcolor}}>
					{t.name}
				</div>
			);
		});
		return (
		    <div>
		        <div className="container-drag">
		            DRAG & DROP DEMO
		        </div>
		        <div className="droppable" onDragOver={(e)=>this.onDragOver(e)}
		        	onDrop={(e)=>this.onDrop(e, "wip")}>
		        	<span className="task-header">WIP</span>
		        	{tasks.wip}
		        </div>
		        <div className="droppable" onDragOver={(e)=>this.onDragOver(e)}
		        	onDrop={(e)=>this.onDrop(e, "complete")}>
		        	<span className="task-header">COMPLETED</span>
		        	{tasks.complete}
		        </div>
		    </div>
		)
	}
}

export default AppDragDropDemo;