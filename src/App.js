import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import search from './imgs/search.png'
import axios from 'axios'
function App() {
  const [movie,setMovie]=useState();
  const [data,setData]=useState();
  const [searchImg,setSearch]=useState(false);
  const [hover,setHover]=useState(false)
  // useEffect( ()=>{
  //  fetchData();
  // },[])
  const fetchData=async (movie)=>{
    const test =await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${movie}`)
    setSearch(true)
    // console.log(test)
    setData(test)
    console.log(data.data.items[0].volumeInfo.averageRating)
    }

    const handleSearch=(e)=>{
      e.preventDefault();
      
      fetchData(movie)
    }
    const handleEnter=()=>{
      console.log("Working")
      setHover(true)
    }
  return (
      <>
      <form>
      <header>
          <h3>BOOK SEARCH</h3>
      </header>
      <section>
          <div className='search' >
              <input type="text" onChange={(e)=>{setMovie(e.target.value)}} placeholder="Search For a Book"/>
              <button onClick={handleSearch}><img src={search} /></button>
          </div>
          <div className='content'>
              {/* <div className='box'> */}
                {/* <img src={searchImg?data.data.items[0].volumeInfo.imageLinks.smallThumbnail:""}/>
                <div className='details'>
                    as
                </div>
              </div> */}
              {data?.data?.items?.map((item,id)=>{
                return(
                  <div className='box'key={id} onMouseOver={()=>{setHover(true)}} onMouseOut={()=>{setHover(false)}}>
                    
                    <div className='coverName'>
                  <a href={item.volumeInfo.previewLink} target={0}><img src={searchImg?item.volumeInfo.imageLinks.smallThumbnail:""} /></a>
                  {!hover?<a href={item.volumeInfo.previewLink} target={0}><div className='details'>
                      <p>{item.volumeInfo.title}</p>
                  </div>
                  </a>:<a href={item.volumeInfo.previewLink} target={0}><div className='hover-details'>
                      <h3>{item.volumeInfo.title}</h3>
                      <h1>{item.volumeInfo.authors}</h1>
                      <h3>Page Count:{item.volumeInfo.pageCount}</h3>
                      <h3>Rating:{item.volumeInfo.averageRating}</h3>
                  </div>
                  </a>
                    }
                  {/* {hover&&
                  <div className='details'>
                    
                  <p>{item.volumeInfo.}</p>
                  <p>{item.volumeInfo.authors}</p>
              </div>
                  } */}
                  </div>
                </div>
                
                )
              })}
          </div>
      </section>
      </form>
      </>
  );
}

export default App;
