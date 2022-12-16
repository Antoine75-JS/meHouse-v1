import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Loading from '../Utils/Loading';
import { checkUserLogged } from '../../actions/auth';
import Snackbar from '../Utils/Snackbar';
import Navbar from '../Navbar';

// LAZY
const OrganisationHomepage = lazy(() => import('../Organisations/OrgaHomepage'));
const LoginPage = lazy(() => import('../LoginPage'));
const TaskEditPage = lazy(() => import('../Tasks/EditTaskForm'));
const TaskPage = lazy(() => import('../Tasks/TaskPage'));
const NewTaskForm = lazy(() => import('../Tasks/NewTaskForm'));
const Homepage = lazy(() => import('../Homepage'));
const SignupPage = lazy(() => import('../SignupPage'));
const CreateOrganisationForm = lazy(() => import('../Organisations/CreateOrganisationForm'));

const App: React.FC = () => {
  const isLogged = useSelector((state: IState) => state.user.isLogged);
  const isLoading = useSelector((state: IState) => state.loading.isLoading);
  const isSnackbarOpen = useSelector((state: IState) => state.snackbar.isSnackbarOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserLogged());
  }, [dispatch]);

  return (
    <div className='bg-main text-white min-h-screen h-full'>
      <header>
        <Navbar />
      </header>
      {isLoading && <Loading />}
      {isSnackbarOpen && <Snackbar />}
      <Routes>
        {isLogged && (
          <>
            <Route path='/task'>
              <Route
                path=':id'
                element={
                  <Suspense fallback={<Loading />}>
                    <TaskPage />
                  </Suspense>
                }
              />
              <Route
                path=':id/edit'
                element={
                  <Suspense fallback={<Loading />}>
                    <TaskEditPage />
                  </Suspense>
                }
              />
              <Route
                path='new/:id'
                element={
                  <Suspense fallback={<Loading />}>
                    <NewTaskForm />
                  </Suspense>
                }
              />
            </Route>
            <Route path='/orga'>
              <Route
                path=':id'
                element={
                  <Suspense fallback={<Loading />}>
                    <OrganisationHomepage />
                  </Suspense>
                }
              />
              <Route
                path='new'
                element={
                  <Suspense fallback={<Loading />}>
                    <CreateOrganisationForm />
                  </Suspense>
                }
              />
            </Route>
          </>
        )}
        <Route
          path='/'
          element={
            <Suspense fallback={<Loading />}>
              <Homepage />
            </Suspense>
          }
        />
        <Route
          path='/login'
          element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path='/signup'
          element={
            <Suspense fallback={<Loading />}>
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<Loading />}>
              <Homepage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
