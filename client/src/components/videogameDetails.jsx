import { useEffect, useState } from "react";
import axios from "axios";
import "./details.css";
import { useParams } from "react-router-dom";

export default function VideogameDetails() {
  const [genre, setGenre] = useState(null);
  const [platform, setPlatform] = useState(null);

  const [videogame, setVideogame] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/Videogame/" + id)
      .then((response) => {
        setVideogame(response.data);
        setGenre(
          response.data.Genres.map((genre) => {
            return genre.name;
          })
        );

        setPlatform(
          response.data.Platforms.map((platform) => {
            return platform.name;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      setVideogame(null);
    };
  }, [id]);
  return (
    <div className="box">
      {videogame ? (
        <>
        <div className="top_position">
          <div className="three">
            <h1 className="color_title">{videogame.name}</h1>
          </div>
        </div>
          <div className="image_description">
            <div className="box_border">
              <div
                className="text_box"
                dangerouslySetInnerHTML={{ __html: videogame.description }}
              />
            </div>
            <div className="cat">
              <img classname="image_from_detail" src={videogame.image} alt={"image" + videogame.name} />
            </div>
          </div>
          <div className="data_box">
            <div>
              <div className="text_padding">
                <h3 className="text">{videogame.rating}</h3>
              </div>
              <div className="text_padding">
                <div className="text">{genre + ""}</div>
              </div>
            </div>
            <div>
              <div className="text_padding">
                <h3 className="text">{videogame.released}</h3>
              </div>
              <div className="text_padding">
                <h3 className="text">{platform + ""}</h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>{null}</div>
      )}
    </div>
  );
}
