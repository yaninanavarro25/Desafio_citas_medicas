import express from 'express';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import moment from 'moment';
moment.locale('es');
import _ from 'lodash';
import chalk from 'chalk';
const routes = express.Router();
const users = [];

routes.get("/usuarios", async (req, res) => {
try {
    const consulta = await axios.get("https://randomuser.me/api/");
    const usuario = consulta.data.results[0]; 
    const name = usuario.name.first;
    const lastname = usuario.name.last;
    const gender = usuario.gender;
    const id = uuid().slice(0, 8);
    const time = moment().format("MMMM Do YYYY, hh:mm A");

    users.push({name, lastname, gender, id, time});

    const [mujeres, hombres] = _.partition(users, {gender: 'female'});
    //console.log('mujeres',mujeres)
    //console.log('hombres',hombres)
    const template = `
    <h5>Mujeres : </h5>
    <ol>
    ${mujeres.map((item) => `<li> Nombre : ${item.name} - Apellido : ${item.lastname} - Genero : ${item.gender} - ID : ${item.id} - Hora : ${item.time} </li>`)}
    </ol>

    <h5>Hombres : </h5>
    <ol>
    ${hombres.map((item) => `<li> Nombre : ${item.name} - Apellido : ${item.lastname} - Genero : ${item.gender} - ID : ${item.id} - Hora : ${item.time} </li>`)}
    </ol>
    `
    console.log(chalk.blue.bgWhite(template))
      res.send(template);
} catch (error) {
    console.log(error)
}
  
})
export default routes;