const TaskItem = props => {
  const {taskDetails} = props
  const {taskName, taskTag} = taskDetails

  return (
    <li>
      <p>{taskName}</p>
      <p>{taskTag}</p>
    </li>
  )
}

export default TaskItem
