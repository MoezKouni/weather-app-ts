import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGeoLatLon } from './actions/geo.actions';
import './App.css';
import { debounce } from './utils/debounce';

function App() {
  const { isLoading } = useSelector((state: any) => state.weather);
  const dispatch = useDispatch<any>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(getGeoLatLon(e.target.value))
  }

  return (
    <div className="App">
      <input placeholder='Search...' type={"search"} onChange={debounce(handleChange, 500)}/>
    </div>
  );
}

export default App;
