import { useState, useEffect } from "react";

const Dogs = () => {
  const [breeds, setBreeds] = useState([]);
  const [subBreeds, setSubBreeds] = useState([]);
  const [selectBreed, setSelectBreed] = useState("");
  const [selectSubBreed, setSelectSubBreed] = useState("");
  const [breedImage, setBreedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all dog breeds
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => setBreeds(Object.keys(data.message)))
      .catch((err) => setError("Failed to load breeds",err));
  }, []);

  // Fetch sub-breeds when breed is selected
  const ChangeBreed = (e) => {
    const breed = e.target.value;
    setSelectBreed(breed);
    setSelectSubBreed(""); // Reset sub-breed selection
    setSubBreeds([]);

    fetch(`https://dog.ceo/api/breed/${breed}/list`)
      .then((res) => res.json())
      .then((data) => setSubBreeds(data.message))
      .catch((err) => setError("Failed to load sub-breeds",err));

    fetchImage(breed);
  };

  // Fetch breed image
  const fetchImage = (breed, subBreed = "") => {
    setLoading(true);
    const url = subBreed
      ? `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
      : `https://dog.ceo/api/breed/${breed}/images/random`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBreedImage(data.message);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load image");
        setLoading(false);
      });
  };

  // Fetch sub-breed image
  const ChangeSubBreed = (e) => {
    const subBreed = e.target.value;
    setSelectSubBreed(subBreed);
    fetchImage(selectBreed, subBreed);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">🐶 Select a Dog Breed</h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Breed Selection */}
          <label className="form-label fw-bold">Choose a Breed</label>
          <select
            className="form-select mb-3"
            onChange={ChangeBreed}
            value={selectBreed}
          >
            <option value="">Select a Breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>

          {/* Sub-Breed Selection */}
          {subBreeds.length > 0 && (
            <>
              <label className="form-label fw-bold">Choose a Sub-Breed</label>
              <select
                className="form-select mb-3"
                onChange={ChangeSubBreed}
                value={selectSubBreed}
              >
                <option value="">Select a Sub-Breed</option>
                {subBreeds.map((subBreed) => (
                  <option key={subBreed} value={subBreed}>{subBreed}</option>
                ))}
              </select>
            </>
          )}

          {/* Loading and Error Handling */}
          {loading && <div className="alert alert-info text-center">Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>

      {/* Display Image */}
      {breedImage && (
        <div className="text-center mt-4">
          <img src={breedImage} alt="Dog" className="img-fluid rounded shadow-lg" style={{ width: "350px" }} />
        </div>
      )}
    </div>
  );
};

export default Dogs;
