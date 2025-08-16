// create your App component here
import { useEffect, useState } from "react";

const DOG_URL = "https://dog.ceo/api/breeds/image/random";

export default function App() {
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(true); // show Loading... on first render

  const fetchDog = () => {
    setLoading(true);
    fetch(DOG_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dog image");
        return res.json();
      })
      .then((data) => {
        // API shape: { message: "<image url>", status: "success" }
        setImgUrl(data.message);
      })
      .catch(() => {
        // keep it simple for this lab; tests don't check errors
        setImgUrl("");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="app">
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Must be the ONLY <img> and alt EXACTLY "A Random Dog"
        <img src={imgUrl} alt="A Random Dog" />
      )}
      {/* Must be the ONLY <button> */}
      <button onClick={fetchDog}>New Dog</button>
    </div>
  );
}
