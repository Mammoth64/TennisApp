import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCities, getObjectsByCity } from "../Redux/store";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBar = styled.div`
  height: 90px;
  width: 100%;
  background: linear-gradient(180deg, rgba(224,224,224,0.4962359943977591) 0%, rgba(250,250,250,0.8603816526610644) 50%, rgba(224,224,224,1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -1px 13px 24px -18px rgba(66, 68, 90, 1);
  h2 {
  color: #000000ae;
  }
`;

const LocationForm = styled.form`
  width: 30%;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  margin-block: 50px;
  text-align: start;
  font-size: 20px;
  button {
    margin-left: 70%;
    background: ${({ theme }) => theme.colors.detailGreen};
    border: none;
    border-radius: 10px;
    padding: 10px 15px;
    margin-block: 10px;
    font-size: 18px;
    cursor: pointer;
  }
`;

const FormItem = styled.div`
height: 35px;
display: flex;
align-items: center;
justify-content: space-between;
margin-block: 10px;
  select {
    padding: 7px;
    width: 180px;
    border-radius: 5px;
    font-size: 18px;
  }
`;

const CourtBooking = () => {
  const cities = useSelector(getAllCities);
  const [selectedCity, setSelectedCity] = useState(cities[0].toString());
  const objects = useSelector(state => getObjectsByCity(state, selectedCity));
  const [objectId, setObjectId] = useState(objects[0].id);

  console.log('object id: ', objects[0].id);
  const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate('/courts/' +  selectedCity + '/' + objectId);
    }
 
  console.log(selectedCity);
  return (
    <Wrapper>
      <HeaderBar>
        <h2>Find a court</h2>
      </HeaderBar>
      <LocationForm>
        <h4>Location:</h4>
        <FormItem >
          <label htmlFor="city">City: </label>
          <select id="city" name="city" onChange={e => setSelectedCity(e.target.value)}>
            <option key={cities[0]}>{cities[0]}</option>
            {cities.map(city => (
              city !== cities[0] && <option key={city}>{city}</option>
            ))}
          </select>
        </FormItem>
        <FormItem>
          <label htmlFor="object">Object: </label>
          <select type="select" name="object" onChange={e => setObjectId(e.target.value)}>
            {objects.map(object => 
            <option value={object.id} key={object.id}>{object.name} {object.address}</option>
            )}
          </select>
        </FormItem>
        <button onClick={handleSubmit}>Submit</button>
      </LocationForm>
    </Wrapper>
  );
};

export default CourtBooking;