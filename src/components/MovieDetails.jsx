import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchMovie } from "../fetures/Movie"; // Fixed typo in 'features'
import Loading from "./Loading";

const MovieDetails = () => {
    const { title } = useParams();
    const dispatch = useDispatch();

    // ✅ Ensure this matches your Redux store structure
    const { movie, loading, error } = useSelector((state) => state.movie);

    useEffect(() => {
        if (title) {
            dispatch(fetchMovie(title));
        }
    }, [dispatch, title]);

    if (loading) return <Loading />;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!movie) return null;

    const rottenTomatoesRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A";

    return (
        <div className="container mt-5">
      {/* Back Button */}
      <Link to="/" className="btn btn-secondary mb-3">
        ← Back to Search
      </Link>

      <div className="card shadow-lg p-4">
        <div className="row">
          {/* Movie Poster */}
          <div className="col-md-4 text-center">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="img-fluid rounded shadow"
              style={{ maxWidth: "100%" }}
            />
          </div>

          {/* Movie Info */}
          <div className="col-md-8">
            <h2 className="fw-bold">{movie.Title} ({movie.Year})</h2>
            <hr />
            <div className="d-flex gap-3 flex-wrap">
              <span className="badge bg-warning text-dark">
                ⭐ {movie.imdbRating} IMDb
              </span>
              <span className="badge bg-danger">🍅 {rottenTomatoesRating}</span>
              <span className="badge bg-primary">🕒 {movie.Runtime}</span>
              <span className="badge bg-dark text-light">{movie.Rated}</span>
            </div>

            <div className="mt-3">
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Cast:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
              {movie.BoxOffice && <p><strong>Box Office:</strong> {movie.BoxOffice}</p>}
              <p><strong>Awards:</strong> {movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default MovieDetails;
