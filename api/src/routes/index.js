require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Dog, Temper} = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCIONES 
const getApiInfo = async () => {
  const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
  const apiInfo = await apiUrl.data.map( e => {
    return {
      name: e.name,
      img: e.image.url,
      weight: e.weight,
      height: e.height,
      life_span: e.life_span, 
      temper: e.temperament
    }
  });
  return apiInfo;
};

const getDbInfo = async () =>{
  return await Dog.findAll({
    include:{
      model: Temper,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    } 
  });
};

const getAllDogs = async () =>{
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
}

//RUTAS!!
router.get('/dogs', async (req, res) =>{
  const name = req.query.name;
  let dogsTotal = await getAllDogs();
  if(name){
    let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    dogsName.length ? 
    res.status(200).json(dogsName) : 
    res.status(404).send(`No hay raza de perro llamada ${name}`)
  } else{
    res.status(200).json(dogsTotal);
  }
})

router.get('/temperaments', async (req, res) =>{
  //USAR ESTA FN PARA METER TEMPS A DB
  let tempFinal = [];
  try {
  const temperApi = await axios.get("https://api.thedogapi.com/v1/breeds")
  let temperament = await temperApi.data.map((e) => {
    const temperamento = e.temperament?.split(", ")
    //console.log(temperamento)
    return temperamento
  });
  const tempEach = temperament.flat();
  //console.log(tempEach, "TEMPEACH")
  tempEach.forEach(async (e) => {
    if(tempFinal.includes(e)){
      return;
    }else{
      tempFinal.push(e)
    }
  });
  const allTemp = tempFinal.join(', ').split(', ').sort()
  console.log(allTemp, "ALLTEMP")
  allTemp.forEach(async (e) => {
    await Temper.findOrCreate({
      where: { name: e },
      defaults: { temperaments: e}
    });
  });
  const allTempers = await Temper.findAll();
  console.log("ALLTEMPERS",allTempers)
  res.json(allTempers)
  } catch (error) {
    res.status(404).send(error)
    console.log(error)
  }
})

// numeros.forEach( (elemento) => {
//   if (!unicos.includes(elemento)) {
//     unicos.push(elemento);
//   }


module.exports = router;
  // const tempEach = temperament.flat()
  // //console.log(tempEach, "ICH")
  // tempEach.forEach( async (e) => {
  //   if(temperFinal.includes(e)){
  //     return;
  //   }else{
  //     temperFinal.push(e)
  //   }
  // });
  // const allTempers = await Temper.findAll();
  // res.json(allTempers)