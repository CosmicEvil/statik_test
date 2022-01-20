import React, { useState }  from 'react';
import TextField from '@material-ui/core/TextField';
import { Select, MenuItem  } from '@material-ui/core';
import "./form.scss";

const Form = () => {

  const [bezoekerWaardes, setBezoekerWaardes] = useState([{ voornaam: "", achternaam : "", abonnementnummer : ""}])
  const [datum, setDatum] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("Reserveer je bezoek aan de zoo!");
  const [timeslot, setTimeslot] = useState("12:00 - 14:00");
  const [json, setJson] = useState({});

  let handleChange = (i, e) => {
    let newBezoekerWaardes = [...bezoekerWaardes];
    newBezoekerWaardes[i][e.target.name] = e.target.value;
    setBezoekerWaardes(newBezoekerWaardes);
  }

  let addBezoeker = () => {
    setBezoekerWaardes([...bezoekerWaardes, { voornaam: "", achternaam : "", abonnementnummer : ""}])
  }

  let removeBezoeker = (i) => {
    let newBezoekerWaardes = [...bezoekerWaardes];
    newBezoekerWaardes.splice(i, 1);
    setBezoekerWaardes(newBezoekerWaardes)
  }

  let handleChangeDatum = e => {
    console.log(e.target.value)
    setDatum(e.target.value);
  }

  let handleChangetijd = e => {
    console.log(e.target.value)
    setTimeslot(e.target.value);
  }

  let checkAbonnementNrs = () => {
    let result = true;
    var errormsg = "";
    bezoekerWaardes.forEach(element => {
      console.log(element.abonnementnummer);
      if(element.abonnementnummer !== ""){
       
       if(element.abonnementnummer.length !== 12){
        errormsg = "Abonnement Nummer is fout! Het is te kort";
        result = false;
       } else {
        let splitString = element.abonnementnummer.split('-');
        console.log(splitString);
        if(splitString.length !== 3 || splitString[0].length !== 4  || splitString[1].length !== 4  || splitString[2].length !== 2){
          errormsg = "Abonnement Nummer is fout! De streepjes staan fout";
          result = false;
        } else {
          let helpModulo = parseInt(splitString[0] + splitString[1]);
          if( helpModulo % 98 !== parseInt(splitString[2])){
            errormsg = "Abonnement Nummer is fout! Het Controle cijfer is fout.";
            result = false;
          }
        }
       }
      }
    });
    console.log(result);
    if(!result){
      setMessage(errormsg);
    }
    return result;
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    if(checkAbonnementNrs()){
     
      setMessage("Je hebt gereserveerd!");
      setSent(true);
      let jsonHelp = {"datum": datum, "timeslot:":timeslot,"bezoekers":bezoekerWaardes};
      setJson(jsonHelp);
    }

  }
  return (
    <div className="form">
      <h1> {message} </h1>
      {sent ? (
        <div> {JSON.stringify(json)} </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='firstRow'>
          <TextField
            id="datum"
            label="Datum*"
            type="date"
            defaultValue="2022-05-24"
            onChange={handleChangeDatum}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className='timeslot'>
           <label>Tijdslot* </label>
          <Select
            labelId="tijdslot"
            id="tijdslot"
            value={timeslot}
            label="Tijdslot"
            onChange={handleChangetijd}
          >
            <MenuItem value={"10:00 - 12:00"}> 10:00 - 12:00 </MenuItem>
            <MenuItem value={"12:00 - 14:00"}> 12:00 - 14:00 </MenuItem>
            <MenuItem value={"14:00 - 16:00"}> 14:00 - 16:00 </MenuItem>
            <MenuItem value={"16:00 - 18:00"}> 16:00 - 18:00 </MenuItem>
          </Select>
          </div>
          </div>
          {bezoekerWaardes.map((element, index) => (
            <div className="bezoeker_block" key={index}>
              <label>Voornaam*</label>
              <input
                type="text"
                name="voornaam"
                required
                value={element.voornaam || ""}
                onChange={(e) => handleChange(index, e)}
              />
              <label>Achternaam*</label>
              <input
                type="text"
                name="achternaam"
                required
                value={element.achternaam || ""}
                onChange={(e) => handleChange(index, e)}
              />
              <label> AbonnementNummer</label>
              <input
                type="text"
                name="abonnementnummer"
                value={element.abonnementnummer || ""}
                onChange={(e) => handleChange(index, e)}
              />
              {index ? (
                <button
                  type="button"
                  className="button remove"
                  onClick={() => removeBezoeker(index)}
                >X
                </button>
              ) : null}
            </div>
          ))}
          <button
            className="button add"
            type="button"
            onClick={() => addBezoeker()}
          >
            Voeg Bezoeker toe!
          </button>
          <button className="button submit" type="submit">
            Reserveer!
          </button>
        </form>
      )}
    </div>
  );
  }

  export default Form;