import './App.css';
import React,{Component, useState} from 'react'
import DataTable from 'react-data-table-component'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      songs: []
    };
  }

API_URL = "http://localhost:5010/"
componentDidMount()
{
    this.refreshSongs();                                
}
async addClick()
{
   var albums = document.getElementById("album").value;
   var artists = document.getElementById("artist").value;
   var genres = document.getElementById("genre").value;
   var titles = document.getElementById("title").value;

   const data = new FormData();
   data.append("album", albums);
   data.append("artist", artists)
   data.append("genere", genres);
   data.append("title", titles);

   fetch(this.API_URL+"api/songs/AddSongs", {
    method:"POST",
    body:data
   }).then(res=> res.json())
   .then((result)=> {
    alert(result);
    this.refreshSongs();
   })
}
async deleteClick(id)
{

   fetch(this.API_URL+"api/songs/deleteSongs"+id, {
    method:"DELETE",
   
   }).then(res=> res.json())
   .then((result)=> {
    alert(result);
    this.refreshSongs();
   })
}

async refreshSongs() {
  fetch(this.API_URL + "api/songs")
    .then(res => res.json())
    .then(data => {
     this.state= this.setState({songs: data});
    });
}

render(){
  const columns = [
    {
      name:  "Album",
      selector: row => row.album,
      sortable: true
    },
    {
      name: "Artist",
      selector: row => row.artist,
      sortable: true
    },
    {
      name:  "Genre",
      selector: row => row.genre,
      sortable: true
    },
    {
      name:  "Title",
      selector: row => row.title,
      sortable: true
    }
  ]

  function handelFilter(){}
  const songs= [this.state]
  console.log(songs, "ABC")

  return (
    <div className="App">
       <h2>Songs information</h2>
       <div>
       <label>Album: </label>
       <input id= "album"/> &nbsp;
       <br></br>
       <label>Artist:  </label>
       <input id= "artist"/> &nbsp;
       </div>
       <div>
        <label>Genre: </label>
       <input id= "genre"/> &nbsp;
       <br></br>
       <label>Title: </label>
       <input id= "title"/> &nbsp;
       </div>
       <button onClick={() => this.addClick()}>Add Songs</button>
      
       <button onClick={() => this.deleteClick(songs.id)}>Delete Songs</button>
      <div>
      <h1>Data Table</h1>
      <div className='container mt-5'>
        <div className='text-end'> <input type='text' onChange={handelFilter()}  /></div>
      <DataTable 
      columns = {columns}
      data={songs.map((d, i) => 
        <tr key={i}>
          <td>{d.id}</td>
        </tr>
        )}

      selectableRows
      fixedHeader
      pagination
      >
          
     