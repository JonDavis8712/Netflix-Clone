import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";
import axios from "axios";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="FLEXNIT ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="TRENDING NOW OMG!!!" fetchUrl={requests.fetchTrending} />
      <Row title="TOP RATED" fetchUrl={requests.fetchTopRated} />
      <Row title="ACTION" fetchUrl={requests.fetchActionMovies} />
      <Row title="COMEDY" fetchUrl={requests.fetchComedyMovies} />
      <Row title="FAMILY" fetchUrl={requests.fetchFamilyMovies} />
      <Row title="ANIMATED" fetchUrl={requests.fetchAnimatedMovies} />
      <Row title="MUSIC" fetchUrl={requests.fetchMusicalMovies} />
      <Row title="HORROR" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="ROMANCE" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="SCIFI" fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title="DRAMA" fetchUrl={requests.fetchDramaMovies} />
      <Row title="MYSTERY" fetchUrl={requests.fetchMysteryMovies} />
      <Row title="CRIME" fetchUrl={requests.fetchCrimeMovies} />
      <Row title="THRILLER" fetchUrl={requests.fetchThrillerMovies} />
      <Row title="FANTASY" fetchUrl={requests.fetchFantasyMovies} />
      <Row title="WESTERN" fetchUrl={requests.fetchWesternMovies} />
      <Row title="WAR" fetchUrl={requests.fetchWarMovies} />
      <Row title="HISTORY" fetchUrl={requests.fetchHistoryMovies} />
      <Row title="DOCUMENTARIES" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
