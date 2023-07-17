import React, {useState} from 'react'

const List = ({data}) => {
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  function addTask(task) {
    if (typeof tasksList[data.name] == "undefined" || tasksList[data.name] == null || tasksList[data.name].length <= 0) 
      tasksList[data.name] = [];

    setTasksList({...tasksList, [data.name]: [...tasksList[data.name], {id: Math.random(100000), name: task, isDone: false}]})
  }

  function deleteItem(id) {
    return () => {
      setTasksList({...tasksList, [data.name]: tasksList[data.name].filter(element => element.id != id)})
    }
  }

  function maskTaskComplete(id) {
    tasksList[data.name].map(element => {
      if (element.id == id) element.isDone = !element.isDone;
      return element;
    });
    setTasksList({...tasksList, [data.name]: tasksList[data.name]?.sort((a, b) => a.isDone - b.isDone)})
  }

  return (
    <div className='list-container'>
      {
       typeof data == 'undefined' || data == null || data.length <= 0 ? 
       (
        <h2 style={{ textAlign: "center" }}>Select a list</h2>
       ) : (
          <div className='list-items'>
          <h2 style={{ textAlign: "center" }}>{data.name}</h2>
              {
                tasksList[data.name] && tasksList[data.name].map(element => {
                  return (
                    <div className='list-item' key={element.id}>
                      <div className='list-item-checkbox'>
                        <input
                          type='checkbox'
                          checked={element.isDone}
                          onChange={() => maskTaskComplete(element.id)}
                        />                        
                        <span style={{textDecoration: element.isDone ? "line-through" : ""}}>{element.name}</span>
                      </div>
                      <span className='delete-item' onClick={deleteItem(element.id)}>&times;</span>
                    </div>
                  )
                })
              }
            <form onSubmit={handleSubmit} className='list-add-item-form'>
              <input
                className='input'
                type='text'
                placeholder='Add task...'
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button className='button' type='submit'>Add</button>
            </form>
          </div>
       )
      }
    </div>
  )
}

export default List