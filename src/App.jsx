import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store/store';
import Navbar from './components/Navbar';
import Weather from './components/wether';
import "/src/App.css";
import Dogs from './components/Dogs';
import MovieDetails from './components/MovieDetails';
import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';




const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Weather/>} />
          <Route path='/dog' element={<Dogs/>}/>
          <Route path="/movie" element={<MovieSearch/>}/>
          <Route path='/movies' element={<MovieList/>}/>
          <Route path="/movie/:title" element={<MovieDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;