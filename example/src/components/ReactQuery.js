import { Pagination } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import './index.css';

const ReactQuery = () => {
	const [page, setPage] = useState(1);
	
	const fetchPlanets = async (page = 1) => {
		const data = await axios.get(`https://jsonplaceholder.typicode.com/posts/${page}/comments`);
		return data.data;
	}

	const {
		data,
		status,
		isLoading,
		isError,
	} = useQuery(
		['call api test react query', page],
		() => fetchPlanets(page),
		{
			staleTime: 5 * (60 * 1000),
			cacheTime: 10 * (60 * 1000),
		},
		{ keepPreviousData : true },
	);
			
	return (
		<>
			<h1>react query</h1>
			{status === 'error' && (
				<div> Error fetching data </div>
			)}
			{status === 'loading' && (
				<div> Loading data... </div>
			)}
			{status === 'success' && (
				<>
					{data.map((item, index) => {
						return (
							<div key={index} className='modal'>
								<p>{item.id}</p>
								<p>{item.email}</p>
								<p>{item.name}</p>
							</div>
						)
					})}
      			<Pagination onChange={(numberPage) => setPage(numberPage)} total={50}/>
				</>
			)} 
			<ReactQueryDevtools initialIsOpen={false}/>
		</>
	);
}

export default ReactQuery;