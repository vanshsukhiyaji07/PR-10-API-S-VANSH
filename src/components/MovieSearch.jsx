import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../fetures/Movie";
import { useNavigate } from "react-router-dom";

const MovieSearch = () => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (title.trim()) {
            dispatch(fetchMovies(title)); 
            navigate("/movies"); 
        } else {
            alert("Please enter a movie title.");
        }
    };

    return (
        <div className="container text-center mt-5">
      {/* Title */}
      <h1 className="fw-bold mb-4">SEARCH THE MOVIES</h1>

      {/* Search Box */}
      <div className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title..."
          className="form-control"
        />
        <button onClick={() => handleSearch(title)} className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
    );
};

export default MovieSearch;
