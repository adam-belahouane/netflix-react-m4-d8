import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import "../styles/moviedetails.css"
import { ListGroupItem } from "react-bootstrap";

function MovieDetails({match}) {

  const [movieID, setMovieID] = useState(match.params.id);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieComments, setMovieComments] = useState([]);

  async function fetchMovieDetails() {
    //let movieID = match.params.id;
    const apiKeyDetails = "2850d816"; //OMDB
    const apiKeyComments =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU1OWUyZGZmNjlkODAwMTU1OWI5YWMiLCJpYXQiOjE2MzMwMDEwMDYsImV4cCI6MTYzNDIxMDYwNn0.PSE3lytW0Er7jsprQrcuXiEjXpmg3SqxkqB1vsu5m6k";

    // Fetch movie details
    // Fetch movie comments
    try {
      let responseMovieDetails = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKeyDetails}&i=${movieID}`
      );

      let responseComments = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${movieID}`,
        {
          headers: {
            Authorization: apiKeyComments,
          },
        }
      );

      if (responseMovieDetails.ok && responseComments.ok) {
        let movieDetailData = await responseMovieDetails.json();
        let movieCommentData = await responseComments.json();
        console.log(movieDetailData);
        console.log(movieCommentData);
        setMovieDetails(movieDetailData); // OBJECT
        setMovieComments(movieCommentData); // ARRAY OF OBJECTS! 

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(movieID);
    fetchMovieDetails();
  // eslint-disable-next-line
  }, []);





  return (movieDetails !== null && movieComments.length > 0) || movieDetails !== null ? (
    <Container fluid className="px-4 text-white">
      <Row>
        <div className="col-6">
          <div style={{ padding: "0.5rem" }}>
            <img src={movieDetails.Poster} style={{ width: "100%" }} alt=""/>
            <h5>{movieDetails.title}</h5>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column align-items-end">
                <h5 className="m-2">Director</h5>
                <h5 className="m-2">Genre</h5>
                <h5 className="m-2">Rating</h5>
              </div>
              <div className="d-flex flex-column align-items-start">
                <h5 className="m-2">{movieDetails.Director}</h5>
                <h5 className="m-2">{movieDetails.Genre}</h5>
                <h5 className="m-2">{movieDetails.imdbRating}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div style={{ padding: "0.5rem" }}>
              <h1>Comments</h1>
            <div className="d-flex flex-column s">
              {
              movieComments.map((comment) => {
                return (
                  <div key={comment._id}>
                    {/* <ListGroupItem className="text-dark"> */}
                      <p className="my-3">{comment.comment}</p>
                    {/* </ListGroupItem> */}
                    {/* <blockquote className="blockquote">
                      <p className="m-0">{comment.comment}</p>
                      <footer className="blockquote-footer">
                        <cite title="Source Title">
                          {comment.author.slice(0, comment.author.indexOf("@"))}
                        </cite>
                      </footer>
                    </blockquote> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Row>
    </Container>
  ) : <h1>SOMETHING IS WONG!</h1>;
}

export default MovieDetails;