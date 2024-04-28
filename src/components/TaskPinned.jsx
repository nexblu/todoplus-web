const TaskPinned = (prop) => {
    let { list } = prop

    const pinnedTasks = list.filter(todo => todo.is_pin);

    return (
        <>
            <ul className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {list
                    .filter(todo => todo.is_pin)
                    .map(todo => (
                        <li
                            key={todo.id}
                            className={`bg-[#68A4F1] flex items-center p-[5px] me-[4rem] ms-[4rem] mb-[15px] rounded-lg border ${todo.is_done ? 'border-lime-500' : 'border-red-600'}`}
                        >
                            <div className="flex justify-center flex-grow">
                                <p className={`${todo.is_done ? 'line-through' : ''} text-[#FFFFFF] text-center`}>
                                    {todo.task}
                                </p>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {pinnedTasks.length > 0 ? <hr className="me-3 ms-3" /> : ''}
            <br />
        </>
    )
}

export default TaskPinned