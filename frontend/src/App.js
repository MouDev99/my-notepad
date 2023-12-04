import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session';
import HomePage from './components/HomePage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (<HomePage />);
}

export default App;
