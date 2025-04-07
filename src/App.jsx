import {useState} from "react";


function App() {
    const [tasks, setTasks] = useState([])
    const [openSection, setOpenSection] = useState({
        taskList: false,
        tasks: true,
        completed: true
    })

    function toggleSection(section) {
        setOpenSection((prev) => ({
            ...prev,
            [section]: !prev[section],

        }))
    }

    function addTasks(task) {
        setTasks([...tasks, {...task, completed: false, id: Date.now()}])
    }
    console.log(tasks)

    return <div className='App'>
        <div className='task-container'>
            <h1>Task List with Priority</h1>
            <button className={`close-button ${openSection.taskList ? 'open' : ''}`}
                    onClick={() => toggleSection('taskList')}>+
            </button>
            {openSection.taskList &&
                <TaskForm addTasks={addTasks}/>
            }

        </div>
        <div className='task-container'>
            <h2>Tasks</h2>
            <button className={`close-button ${openSection.tasks ? 'open' : ''}`}
                    onClick={() => toggleSection('tasks')}>+
            </button>
            <div className='sort-controls'>
                <button className='sort-button'>By Date</button>
                <button className='sort-button'>By Priority</button>
            </div>
            {
                openSection.tasks &&
                <TaskList/>
            }

        </div>
        <div className='completed-task-container'>
            <h2>Completad Task</h2>
            <button className={`close-button ${openSection.completed ? 'open' : ''} `}
                    onClick={() => toggleSection('completed')}>+
            </button>
            {
                openSection.completed &&
                <CompletedTaskList/>
            }

        </div>
        <Footer/>
    </div>;
}


function TaskForm({addTasks}) {
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('Low')
    const [deadline, setDeadline] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (title.trim() && deadline) {
            addTasks({title, priority, deadline});
            setTitle('');
            setPriority('Low');
            setDeadline('')
        }
    }

    return <form action='' className='task-form' onSubmit={handleSubmit}>
        <input type="text"
               value={title}
               placeholder='Task title'
               required
               onChange={(e) => {
                   setTitle(e.target.value)
               }}/>
        <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
        </select>
        <input
            type='datetime-local'
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
        />
        <button type='submit'> Add task</button>
    </form>
}

function TaskList() {
    return <ul className='task-list'><TaskItem/></ul>
}

function CompletedTaskList() {
    return <ul className='completed-task-list'>
        <TaskItem/>
    </ul>
}

function TaskItem() {
    return (
        <li className='task-item'>
            <div className='task-info'>
                <div>
                    Title <strong>Medium</strong>
                </div>
                <div className='task-deadline'>Due: {new Date().toLocaleString()}</div>
            </div>
            <div className='task-buttons'>
                <button className='complete-button'>Complete</button>
                <button className='delete-button'>Delete</button>
            </div>
        </li>
    )
}

function Footer() {
    return <footer className='footer'>
        <p>
            Technologies and React concepts used: React, JSX, props, useState, component composition,
            conditional rendering, array methods (map, filter), event handling.
        </p>
    </footer>
}


export default App;

