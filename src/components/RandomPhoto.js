import React, { useState, useEffect } from "react";
import { api_url, api_key } from "../api/Config";
import Masony from "react-masonry-component";

export default function RandomPhoto() {
  const [data, setData] = useState([]);
  const loading = true;

  useEffect(() => {
    fetch(`${api_url}/photos/random/?client_id=${api_key}&count=30`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const masonryOptions = {
    fitWidth: false,
    gutter: 30,
    itemSelector: ".photo-item",
  };

  return (
    <div>
      {loading ? (
        <div>
          <Masony
            className="photo-list"
            elementType={"ul"}
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
            display="flex"
            flex-wrap="wrap"
          >
            {data.map((item) => (
              <li className="photo-item " key={item.id}>
                <img
                  className="image"
                  src={item.urls.regular}
                  alt={item.alt_description}
                />
              </li>
            ))}
          </Masony>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
