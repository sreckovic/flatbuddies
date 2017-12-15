import React, { Component } from "react";

import axios from "../../axios";

import Aux from "../../hoc/Aux/Aux";
import SingleRoom from "../../components/SingleRoom/SingleRoom";

class Rooms extends Component {
  state = {
    rooms: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    axios
      .get("/rooms.json")
      .then(response => {
        const fetchedRooms = response.data;
        const newRooms = [];

        console.log(fetchedRooms);

        for (let key in fetchedRooms) {
          if (!fetchedRooms.hasOwnProperty(key)) continue;
          // Push new room object in newRooms array
          newRooms.push({
            id: key,
            address: fetchedRooms[key].address,
            bathrooms: fetchedRooms[key].bathrooms,
            bedrooms: fetchedRooms[key].bedrooms,
            description: fetchedRooms[key].description,
            flatmates: fetchedRooms[key].flatmates,
            internet: fetchedRooms[key].internet,
            parking: fetchedRooms[key].parking,
            type: fetchedRooms[key].type
          });
        }

        this.setState({ rooms: newRooms });
        console.log(this.state.rooms);
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error);
      });
  }

  render() {
    let rooms = null;

    if (this.state.loading) {
      rooms = <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    if (this.state.error) {
      rooms = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    }

    if (this.state.rooms) {
      rooms = this.state.rooms.map(room => {
        return (
          <div className="column is-one-third" key={room.id}>
            <SingleRoom room={room} />
          </div>
        );
      });
    }

    return (
      <Aux>
        <h2>Rooms for Rent</h2>
        <div className="columns is-multiline">{rooms}</div>
      </Aux>
    );
  }
}

export default Rooms;