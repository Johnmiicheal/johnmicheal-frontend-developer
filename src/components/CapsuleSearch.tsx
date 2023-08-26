import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface Capsule {
  capsule_id: string;
  capsule_serial: string;
  details: string;
  landings: number;
  status: string;
  type: string;
  missions: {
    0: {
      flight: number;
      name: string;
    }
  };
  reuse_count: string;
  // Add other properties as needed
}
interface SearchData {
  searchInput: string;
  searchOption1: string;
  searchOption2: string;
  searchOption3: string;
}

const CapsuleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Capsule>();

  //   useEffect(() => {
  //     // Define a function to fetch search results
  //     const fetchSearchResults = async () => {
  //       try {
  //         const response = await fetch(`https://api.spacexdata.com/v3/Capsules/${searchTerm}`);
  //         const data = await response.json();
  //         setSearchResults(data);
  //       } catch (error) {
  //         console.error('Error fetching search results:', error);
  //       }
  //     };

  //     if (searchTerm.trim() !== '') {
  //       fetchSearchResults();
  //     } else {
  //       setSearchResults([]);
  //     }
  //   }, [searchTerm]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchData>({
    searchInput: "",
    searchOption1: "",
    searchOption2: "",
    searchOption3: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    const { searchInput, searchOption1, searchOption2, searchOption3 } =
      searchData;

    console.log("Value:", searchInput);
    const formattedInput = searchInput.toUpperCase().replace(/\s/g, "");

    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/capsules/${formattedInput}`
      );
      const data = await response.json();
      setSearchResults(data);

      // Handle the response data here
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occured while fetching data")
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Search and discover our Space Capsules
        </h2>
        <p className=" mt-1 text-gray-800 text-center">
          A space capsule is a spacecraft designed to transport cargo,
          scientific experiments, and/or astronauts to and from space.
        </p>
      </div>

      <div className="mt-10 sm:w-full sm:max-w-lg flex flex-col items-center">
        <form
          className="space-y-6 p-4 border rounded-md lg:w-[30em] items-center"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              Capsule Serial
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="searchInput"
                value={searchData.searchInput}
                onChange={handleInputChange}
                type="text"
                placeholder="Which Capsule would you like to know about"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn-spacex flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
      </div>

{searchResults && (
      <div className="flex flex-col items-start mt-10">
        <p className="block text-sm font-medium leading-6 text-gray-900 ">
          Capsule Serial: <strong>{searchResults?.capsule_serial}</strong>
        </p>
        <p className="text-sm font-medium leading-6 text-gray-900 ">
          Capsule ID: <strong>{searchResults?.capsule_id}</strong>
        </p>
        <p className="text-sm font-medium leading-6 text-gray-900 ">
          Details: <strong>{searchResults?.details}</strong>
        </p>
        <p className="text-sm font-medium leading-6 text-gray-900 ">
          Number of Landings: <strong>{searchResults?.landings}</strong>
        </p>
        <p className="text-sm font-medium leading-6 text-gray-900 ">
          Number of Mission Flights: <strong>{searchResults?.missions[0].flight}</strong>
        </p>
        <p className="text-sm font-medium leading-6 text-gray-900 ">
          Mission Name: <strong>{searchResults?.missions[0].name}</strong>
        </p>
        <p className="text-sm font-medium leading-6 text-gray-900 ">
          Capsule Status: <strong>{searchResults?.status}</strong>
        </p>
      </div>
)}
    </div>
  );
};

export default CapsuleSearch;
