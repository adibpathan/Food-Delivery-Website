import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./List.css";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after removing an item
      } else {
        toast.error("Failed to remove food item");
      }
    } catch (error) {
      toast.error("An error occurred while removing the food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, [url]); // Include url as dependency if it can change

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div> 
        {list.map((item) => (
          <div key={item._id} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price.toFixed(2)}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

