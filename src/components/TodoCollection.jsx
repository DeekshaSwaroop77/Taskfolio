import React from 'react';
import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onToggleDone,
  onChangeMode,
  onDelete,
  onSave,
}) => {
  // console.log(todos);

  return (
    <div>
      TodoCollection
      {/* <TodoItem /> */}
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={(id) => {
              onToggleDone?.(id);
            }}
            onChangeMode={(id, isEdit) => {
              onChangeMode?.(id, isEdit);
            }}
            onSave={(id, title) => {
              onSave?.(id, title);
            }}
            onDelete={(id) => {
              onDelete?.(id);
            }}
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
