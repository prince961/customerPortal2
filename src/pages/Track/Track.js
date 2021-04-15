import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const Track = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("8436410000022");
  const [url, setUrl] = useState(
    "https://track.delhivery.com/api/v1/packages/json/?token=8ff6cb0893fbca84b2e5a0ecb78e83c25a416933&waybill=8436410000022"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="submit"
        className="btn solid"
        onClick={() =>
          setUrl(
            `https://track.delhivery.com/api/v1/packages/json/?token=8ff6cb0893fbca84b2e5a0ecb78e83c25a416933&waybill=${query}`
          )
        }
      >
        Track
      </button>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            // feach the data us used
            <li key={item.Shipment}></li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Track;
