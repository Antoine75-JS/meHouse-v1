// GETTERS
export const GET_ALL_TASKS = 'GET_ALL_TASKS';
export const GET_TASK_DETAILS = 'GET_TASK_DETAILS';
export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
export const DELETE_TASK = 'DELETE_TASK';

// SETTERS
export const SET_ALL_TASKS = 'SET_ALL_TASKS';

// TYPES
export type TasksActionTypes =
  // GETTERS
  | { type: typeof GET_ALL_TASKS }
  | { type: typeof GET_TASK_DETAILS }
  // SETTERS
  | { type: typeof SET_ALL_TASKS; payload: ITasksList }
  | { type: typeof CREATE_NEW_TASK; payload: INewTaskPayload }
  | { type: typeof DELETE_TASK; payload: string };

// GETTERS DISPATCH
export const getAllTasks = (): TasksActionTypes => ({
  type: GET_ALL_TASKS,
});

export const getTaskDetails = (): TasksActionTypes => ({
  type: GET_TASK_DETAILS,
});

// SETTERS DISPATCH
export const setAllTasks = (payload: ITasksList): TasksActionTypes => ({
  type: SET_ALL_TASKS,
  payload,
});

export const createNewTask = (payload: INewTaskPayload): TasksActionTypes => ({
  type: CREATE_NEW_TASK,
  payload,
});

export const deleteTask = (payload: string): TasksActionTypes => ({
  type: DELETE_TASK,
  payload,
});
