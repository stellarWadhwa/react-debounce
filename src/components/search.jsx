import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [data, setData] = useState([]);
  const [listdata, setListdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://mocki.io/v1/a588da9e-a704-46ad-9347-e3420cef6e40');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const debounce = (func) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, 1000);
    };
  };

  const handleChange = debounce((e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert search value to lowercase

    if (searchValue === '') {
      setListdata([]); // Clear the list when search query is empty
    } else {
      const filteredData = data.filter(user =>
        user.name.toLowerCase().startsWith(searchValue)
      );
      setListdata(filteredData); // Update listdata state with filtered data
    }
  });

  return (
    <div className='p'>
      <div className='searchbar'>
        <form>
          <label>Search</label>
          <input type="text" onChange={handleChange} />
        </form>
        <div className='searchRes'>
          {listdata.map((item, index) => (
            // Add unique key prop
            <div key={index} className='searchItem display:listdata.length===0?none:block'>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
