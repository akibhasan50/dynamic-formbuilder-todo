import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import TodoList from './pages/TodoList/TodoList';
import FormBuilder from './pages/FormBuilder/FormBuilder';
import FormPreview from './pages/FormPreview/FormPreview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/todos" replace />,
      },
      {
        path: 'todos',
        element: <TodoList />,
      },
      {
        path: 'form-builder',
        element: <FormBuilder />,
      },
    ],
  },
]);

export default router;
