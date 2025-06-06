import {useEffect, useState} from "react";


function App() {
    const [tasks, setTasks] = useState([])
    const [sortType, setSortType] = useState('date')
    const [sortOrder, setSortOder] = useState('asc')
    const [openSection, setOpenSection] = useState({
        taskList: false,
        tasks: true,
        completed: true
    })
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])



    function toggleSection(section) {
        setOpenSection((prev) => ({
            ...prev,
            [section]: !prev[section],

        }))
    }

    function addTasks(task) {
        setTasks([...tasks, {...task, completed: false, id: Date.now()}])
    }

  function deleteTask(id) {
      setTasks(tasks.filter(task => task.id !== id))
  }

  function  completeTask(id) {
        setTasks(tasks.map(task => task.id === id ? {...task,  completed: true } : task))
  }

  function sortTask(task) {
        return task.slice().sort((a, b) => {
            if(sortType === 'priority') {
                const priorityOrder = {High: 1, Medium: 2, Low: 3}
                return sortOrder === 'asc'
                    ? priorityOrder[a.priority] -priorityOrder[b.priority]
                    : priorityOrder[b.priority] -priorityOrder[a.priority]
            }else{
                return sortOrder === 'asc'
                    ? new Date(a.deadline) - new Date(b.deadline)
                    : new Date(b.deadline) - new Date(a.deadline)
            }
        })
  }

  function toggleSortOrder(type) {
        if(sortType === type) {
            setSortOder(sortOrder === 'asc' ? 'desc' : 'asc' )
        }else{
            setSortType(type)
            setSortOder('asc')
        }
  }



    const activeTasks = sortTask(tasks.filter(task => !task.completed))
    const completedTasks = tasks.filter(task => task.completed)

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
                <button className={`sort-button ${sortType === 'date' ? 'active' : ''}`} onClick={() => toggleSortOrder('date')}>
                    By Date {sortType === 'date' && sortOrder === 'asc' ? '\u2191' : '\u2193'}</button>
                <button className={`sort-button ${sortType === 'priority' ? 'active' : ''}`} onClick={() => toggleSortOrder('priority')}>
                    By Priority {sortType === 'priority' && (sortOrder === 'asc' ?
                    '\u2191' : '\u2193')}</button>
            </div>
            {
                openSection.tasks &&
                <TaskList deleteTask={deleteTask}
                          activeTasks={activeTasks}
                          completeTask={completeTask}
                          currentTime={currentTime}/>
            }

        </div>
        <div className='completed-task-container'>
            <h2>Completad Task</h2>
            <button className={`close-button ${openSection.completed ? 'open' : ''} `}
                    onClick={() => toggleSection('completed')}>+
            </button>
            {
                openSection.completed &&
                <CompletedTaskList deleteTask={deleteTask} completedTasks={completedTasks}/>
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

function TaskList({activeTasks, deleteTask, completeTask, currentTime}) {
    console.log(activeTasks)
    return <ul className='task-list'>
        {activeTasks.map(task =>(
            <TaskItem task={task}
                      key={task.id}
                      deleteTask={deleteTask}
                      completeTask={completeTask}
                      isOverdue={ new Date(task.deadline) < currentTime}
            />
        ) )}

    </ul>
}

function CompletedTaskList({completedTasks, deleteTask}) {
    return <ul className='completed-task-list'>
        {completedTasks.map(task => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask}/>
        ))}

    </ul>
}

function TaskItem({task, deleteTask, completeTask, isOverdue }) {
    const {title, priority, deadline, id, completed} = task


    return (
        <li className={`task-item ${ priority.toLowerCase()} ${isOverdue ? 'overdue' : ''}`}>
            <div className='task-info'>
                <div>
                    {title} <strong>{priority}</strong>
                </div>
                <div className='task-deadline'>Due: {new Date(deadline).toLocaleString()}</div>
            </div>
            <div className='task-buttons'>
                {  !completed && (
                    <button className='complete-button' onClick={() => completeTask(id)}>Complete</button>
                )}

                <button className='delete-button' onClick={() => deleteTask(id)}>Delete</button>
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

