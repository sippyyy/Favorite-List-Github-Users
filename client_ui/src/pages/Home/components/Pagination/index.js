import React, { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Pagination.css'
import axios from 'axios'
import {useUpdateEffect} from 'ahooks'

// Example items, to simulate fetching from another resources.
const items = []
for(let i=1;i<=50;i++){
    items.push(i)
}

function Pagination({ itemsPerPage,mode,setList,user }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = useMemo(()=>{
         return itemOffset + itemsPerPage;
    },[itemOffset])
    
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    useUpdateEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_GITHUB}search/users?q=${user}&page=${endOffset}&per_page=20`)
            .then(res => setList(res.data.items))
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [endOffset])

    const pageCount = useMemo(()=>{
        return Math.ceil(items.length / itemsPerPage);
    },[])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <Container>
                <ReactPaginate
                    className='pagination flex font-text flex-mid'
                    pageClassName='li padding-mid
                    light-purple-bg radius flex flex-mid white-color'
                    previousClassName='font-max margin-right-10 bold'
                    nextClassName='font-max margin-left-10 bold'
                    activeClassName='dark-purple-bg'
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </Container>
        </div>
    );
}

export default Pagination

// Add a <div id="container"> to your HTML to see the componend rendered.