import React from "react";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const Api = () => {
  const key = "AIzaSyDrTIu7yDlYuTRG1Z5zWhhRaWMpYLG04rM";
  const engineId = "a511845cd4b734f43";
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [maindata, setMain] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const FetchSearch = async (inputValue) => {
    const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${engineId}&q=${inputValue}`;
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("something went wrong");
      const data = await response.json();
      setMain(data.searchInformation);
      console.log(data);
      setData(data.items);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const clickButton = () => {
    FetchSearch(search);
  };
  return (
    <div className="container mx-auto p-4 px-10 max-w-5xl">
      <h1 className="logo">HaYsearch</h1>
      <div className="col-span-full">
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            name="street-address"
            className="block rounded-2xl border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  flex-1 w-1 px-3"
            onChange={handleSearch}
            value={search}
          />
          <button
            className="btn bg-slate-700 text-white text-center p-2 px-4 rounded-md"
            onClick={clickButton}
          >
            Search
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="load">
            <HashLoader />
          </div>
        ) : error ? (
          <p>Error : {error.message}</p>
        ) : data && maindata ? (
          
          <div>
            {maindata.length == 0 ? null : <h1 className="search-info">Generated {data.length} results in ({maindata.formattedSearchTime}s)</h1>}
            
            
            {data.map((data, index) => {
              return (
                <div key={index}>
                  <div className="search-card">
                    <div className="flex-head">
                      <div className="flex-head-text">
                        <h3>
                          <a href={data.link}>{data.title}</a>
                        </h3>
                        <h6>
                          <a href={data.link}>{data.displayLink}</a>
                        </h6>
                      </div>
                    </div>
                    <div className="flex-body">
                      <p>{data.snippet}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Api;
