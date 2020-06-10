import React, {Component} from "react";
import Modal from 'react-modal';
import axios from 'axios';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Container, Columns } from 'react-bulma-components';
import '../provider.css';

const Provider = props => {
  const {name, providerImg, providerBackground, pricing, link, backgroundGradient, color, blurb} = props;

  const styling = {backgroundImage: `url("${providerBackground}"), ${backgroundGradient}`}

  const [isOpen, open] = React.useState(false);

  function openModal(provider) {
      fetchShows(provider);
      open(true);
  };
  function closeModal() {
      open(false);
  };
  let shows = [];
  let urls = [];
  let posters = [];
  async function fetchShows (provider) {
    await axios.get('/api/shows/platform/' + provider)
    .then(res => {
      for (let i = 0; i < 9; i++) {
        shows.push(res.data[i])
      }
    })
    .then(async () => {
      for (const s of shows) {
        await axios.get('/api/poster/apikey/4a3b711b/IMDbID/' + s.imdb)
        .then(res => {
          s['poster'] = res.data
          urls.push(s['poster']);
        })
      }
    })
    posters = urls.map(u => (
      "<Columns.Column><img src=" + u + "alt='hi'/></Columns.Column>"
    ))
    for (let i = 0; i < 3; i++) {
      document.getElementById("post1").insertAdjacentHTML( 'beforeend', posters[i]);
    }
    for (let i = 3; i < 6; i++) {
      document.getElementById("post2").insertAdjacentHTML( 'beforeend', posters[i]);
    }
    for (let i = 6; i < 9; i++) {
      document.getElementById("post3").insertAdjacentHTML( 'beforeend', posters[i]);
    }
  }
  return(
    <div className="provider" style={styling}>
    <h2>

    <img alt={name} title={name} src={providerImg}></img>

    </h2>
    <h3>{pricing}</h3>
    <hr style={{border: `2px ${color} solid`}}className="spacer"/>
    <br/>
    <ul className="blurb">
    {blurb}
    </ul>
    <button className="btn btn-default" style={{backgroundColor: color}} onClick={() => openModal(name)}>Learn More</button>
    <div>
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Provider Modal">
          <Container>
            <Button onClick={closeModal}>X</Button>
            <h2 className="head">Explore {name}</h2>
            <a href={link}><Button className="sub">Subscribe Now!</Button></a>
            <Columns id="post1" className="posters">
            </Columns>
            <Columns id="post2" className="posters">
            </Columns>
            <Columns id="post3" className="posters">
            </Columns>
          </Container>
        </Modal>
      </div>
    </div>
  )
}


export default Provider;
