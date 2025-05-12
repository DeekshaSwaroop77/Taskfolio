import React, { useEffect, useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext'; // Importing encapsulated authentication context

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState([]);
  const [listLength, setListLength] = useState(todo.length);
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth(); // Extracting required states and methods

  // Handle input value change
  const handleChangeValue = (value) => {
    setInputValue(value);
  };

  // Handle adding a new todo via API
  const handleAddTodos = async () => {
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodo([
        ...todo,
        {
          // ID is created by the database
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false,
        },
      ]);

      setListLength((prevLength) => {
        return prevLength + 1;
      });
      // Clear input after submission
      setInputValue('');
    } catch (error) {
      console.log(`[createData failed]`);
    }
  };
  // Handle adding a todo by pressing Enter key
  const handleKeyEnter = async () => {
    if (inputValue === '') {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodo([
        ...todo,
        {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false,
        },
      ]);
      setListLength((prevLength) => {
        return prevLength + 1;
      });
      // Clear input after submission
      setInputValue('');
    } catch (error) {
      console.log(`[createData failed]`);
    }
  };

  // Toggle completion status of a todo
  const handleToggleDone = async (id) => {
    const currentTodo = todo.find((todo) => todo.id === id);

    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodo((prevtodos) => {
        return prevtodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.log(`[updateData failed]`);
    }
  };

  // Switch todo item between view and edit mode
  const handleChangeMode = ({ id, isEdit }) => {
    setTodo((prevtodos) => {
      return prevtodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        } else {
          return {
            ...todo,
            isEdit: false,
          };
        }
      });
    });
  };

  // Save edited todo title
  const handleOnSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      });

      setTodo((prevtodos) => {
        return prevtodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.log(`[saveList failed]`);
    }

  };

  // Delete a todo item
  const handleOnDelete = async (id) => {

    try {
      await deleteTodo(id);
      setTodo((prevtodos) => {
        return prevtodos.filter((t) => t.id !== id);
      });
      setListLength((prevLength) => {
        return prevLength - 1;
      });
    } catch (error) {
      console.log(`[delete List failed]`);
    }
  };

  // Api event
  // Fetch todos when component mounts
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodo(
          todos.map((todo) => ({
            ...todo,
            isEdit: false,
          }))
        );
        setListLength(todos.length);
      } catch (error) {
        console.log(`[getTodosAsync failed]`);
      }
    };
    getTodosAsync();
  }, []);

  // Check for valid authentication token
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      <h1>Taskfolio</h1>
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChangeValue={handleChangeValue}
        onAddTodo={handleAddTodos}
        onKeyEnter={handleKeyEnter}
      />
      <TodoCollection
        todos={todo}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleOnSave}
        onDelete={handleOnDelete}
      />
      <Footer listLength={listLength} />
    </div>
  );
};

export default TodoPage;
