import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const MovieList = () => {
    const { movies, loading, error } = useSelector((state) => state.movie);

    if (loading) return <Loading />;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="container mt-4">
        <div className="row">
          {movies?.map((movie) => (
            <div key={movie.imdbID} className="col-md-3 col-sm-6 mb-4">
              <div className="card shadow-sm h-100">
                <Link to={`/movie/${movie.Title}`}>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="card-img-top"
                  />
                </Link>
                <div className="card-body text-center">
                  <p className="card-title fw-bold">
                    {movie.Title} ({movie.Year})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default MovieList;
