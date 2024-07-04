/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { nanoid } from 'nanoid';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { setTheme } from '@containers/App/actions';
import { selectTheme } from '@containers/App/selectors';
import { addTodo, clearComplete, completeTodo, deleteTodo, updateTodo } from './actions';

import classes from './style.module.scss';
import Checked from './Checked';
import { selectTodo } from './selectors';

const Home = ({ todoList, theme }) => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState('');
  const [filter, setFilter] = useState('');

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };
  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  const iconStyle = {
    width: '1.5rem',
    height: '1.5rem',
  };
  const handleInputTodo = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: nanoid(),
        todo,
        completed: false,
      })
    );
    setTodo(e.target.reset());
  };
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleCompleteTodo = (id) => {
    dispatch(completeTodo(id));
  };
  const handleClearComplete = () => {
    dispatch(clearComplete());
  };
  const handleFilterData = useMemo(() => {
    if (filter === 'active') {
      return todoList.filter((item) => item.completed === false);
    }
    if (filter === 'complete') {
      return todoList.filter((item) => item.completed === true);
    }
    return todoList;
  }, [filter, todoList]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(handleFilterData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(updateTodo(items));
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperImg} />
      <div className={classes.header}>
        <h1>TODO</h1>
        <Stack direction="row">
          <IconButton onClick={handleTheme}>
            {theme === 'light' ? <DarkModeIcon sx={iconStyle} /> : <LightModeIcon sx={iconStyle} htmlColor="#fae6be" />}
          </IconButton>
        </Stack>
      </div>
      <form onSubmit={handleInputTodo} className={classes.inputContainer}>
        <input type="text" placeholder="Create a new todo.." onChange={handleTodo} />
        <Checkbox
          className={classes.checked}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<Checked />}
          disableRipple="true"
          sx={{
            '&.Mui-checked': {
              color: 'hsl(280, 87%, 65%)',
            },
          }}
        />
      </form>
      <div style={{ marginTop: '20px' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {handleFilterData?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={classes.todoCard}
                      >
                        <div className={classes.todo}>
                          <Checkbox
                            checked={item.completed}
                            className={classes.checked}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<Checked />}
                            disableRipple
                            sx={{
                              '&.Mui-checked': {
                                color: 'hsl(280, 87%, 65%)',
                              },
                            }}
                            onClick={() => handleCompleteTodo(item.id)}
                          />
                          <p
                            style={
                              item.completed && theme
                                ? { textDecoration: 'line-through', fontStyle: 'italic', color: 'var(--color-subtext)' }
                                : null
                            }
                          >
                            {item.todo}
                          </p>
                        </div>
                        <i onClick={() => handleDeleteTodo(item.id)}>
                          <CloseIcon />
                        </i>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className={classes.filter}>
        <h6>{handleFilterData.length} items left</h6>
        <div className={classes.filterButton}>
          <button type="button" onClick={() => setFilter('')}>
            All
          </button>
          <button type="button" onClick={() => setFilter('active')}>
            Active
          </button>
          <button type="button" onClick={() => setFilter('complete')}>
            Completed
          </button>
        </div>
        <button type="button" onClick={handleClearComplete}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

Home.propTypes = {
  todoList: PropTypes.array,
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  todoList: selectTodo,
  theme: selectTheme,
});

export default connect(mapStateToProps)(Home);
