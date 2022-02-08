import React, { useState, useEffect, useContext } from "react";
import Masony from "react-masonry-component";
import { api_url, api_key } from "../api/Config";
import { changeContext } from "../App";

export default function SearchPhoto() {
  const loading = true;
  const [data, setData] = useState([]);
  const query = useContext(changeContext);

  const masonryOptions = {
    fitWidth: false,
    columnWidth: 300,
    gutter: 30,
    itemSelector: ".photo-item",
  };

  useEffect(() => {
    fetch(
      `${api_url}/search/photos/?client_id=${api_key}&per_page=30&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [query]);

  return (
    <div>
      {loading ? (
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
