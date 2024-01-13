import {Component} from 'react'
import {v4} from 'uuid'
import TagItem from './components/TagItem'
import TaskItem from './components/TaskItem'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    activeOptionId: tagsList[0].optionId,
    taskInput: '',
    activeCategoryId: '',
  }

  addTask = event => {
    event.preventDefault()
    const {taskInput, activeOptionId} = this.state
    const tagObj = tagsList.find(eachTag => eachTag.optionId === activeOptionId)
    const newTask = {
      id: v4(),
      taskName: taskInput,
      taskCategoryId: activeOptionId,
      taskTag: tagObj.displayText,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      taskInput: '',
      activeOptionId: tagsList[0].optionId,
    }))
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTaskTag = event => {
    this.setState({activeOptionId: event.target.value})
  }

  onChangeTaskCategory = id => {
    const {activeCategoryId} = this.state
    if (activeCategoryId === id) {
      this.setState({activeCategoryId: ''})
    } else {
      this.setState({activeCategoryId: id})
    }
  }

  render() {
    const {tasksList, taskInput, activeOptionId, activeCategoryId} = this.state

    let categorySpecificTasksList = tasksList

    if (activeCategoryId !== '') {
      categorySpecificTasksList = tasksList.filter(
        eachTask => eachTask.taskCategoryId === activeCategoryId,
      )
    }

    const isCategorySpecificTasksListEmpty =
      categorySpecificTasksList.length === 0

    return (
      <div>
        <div>
          <h1>Create a task!</h1>
          <form onSubmit={this.addTask}>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.onChangeTaskInput}
            />

            <label htmlFor="tags">Tags</label>
            <select
              id="tags"
              onChange={this.onChangeTaskTag}
              value={activeOptionId}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                categoryDetails={eachTag}
                onChangeTaskCategory={this.onChangeTaskCategory}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {isCategorySpecificTasksListEmpty ? (
            <div>
              <p>No Tasks Added Yet</p>
            </div>
          ) : (
            <ul>
              {categorySpecificTasksList.map(eachTask => (
                <TaskItem key={eachTask.id} taskDetails={eachTask} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
