import { Pagination, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TableComponent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    setIsLoading(true);
    const getApi = async () => {
        try {
            const dataApi = await axios.get( `https://jsonplaceholder.typicode.com/posts/${page}/comments`);
            setData(dataApi.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    getApi();
  },[page]);

  const dataSource = data.map((item, index) => {
    return {
      id: item.id,
      email: item.email,
      body: item.body
    }
  });
  
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'body',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  return (
    <div className="App">
      <Table 
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        loading={isLoading}
      />
      <Pagination onChange={(numberPage) => setPage(numberPage)} total={50}/>
    </div>
  );
}

export default TableComponent;
