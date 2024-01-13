const TagItem = props => {
  const {categoryDetails, onChangeTaskCategory} = props
  const {optionId, displayText} = categoryDetails
  const onClickButton = () => {
    onChangeTaskCategory(optionId)
  }

  return (
    <li>
      <button type="button" onClick={onClickButton}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
