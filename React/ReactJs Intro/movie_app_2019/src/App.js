import React from 'react';
import Proptypes from 'prop-types';

function MmdCharacter({name, picture, rating}){
  return (
    <div>
      <h3>I like {name}</h3>
      <h4>{rating}</h4>
      <img src={picture} alt={name} height="200" ></img>
    </div>
  )
}

MmdCharacter.propTypes = {
   name: Proptypes.string.isRequired,
   picture: Proptypes.string.isRequired,
   rating: Proptypes.number.isRequired
}

function App() {
  return (
    <div>
     {mmdLike.map(item => (
      <MmdCharacter
        key={item.id} 
        name={item.name} 
        picture={item.image}
        rating={item.rating}
      />
     ))}
    </div>
  
  );
}





const mmdLike = [
  {
    id:1,
    name:'haku',
    image:"haku.jpg",
    rating:5.3,
  },
  {
    id:2,
    name:'Juon Kiku',
    image:"Juon Kiku.jpg",
    rating:4.2,
  },
  {
    id:33,
    name:'luka',
    image:"luka.jpg",
    rating:3.9,
  },
  {
    id:4,
    name:'lyn',
    image:"lyn.jpg",
    rating:8,
  },
  {
    id:5,
    name:'miku',
    image:"miku.jpg",
    rating:12,
  },
  {
    id:6,
    name:'miku_chair',
    image:"miku_chair.jpg",
    rating:4,
  },
  {
    id:7,
    name:'neru',
    image:"neru.jpg",
    rating:23.3,
  },
  {
    id:8,
    name:'teto',
    image:"teto.jpg",
    rating:16,
  },  
];

export default App;
