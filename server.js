//https://www.youtube.com/watch?v=D7tv4cNobIk (fonte)
//importar express
const express = require('express');
// iniciar express
const app = express();
// nome da pasta do build no dist
const app_name = 'calculadora';
//local de geração do buil
const outputPath = `${__dirname}/dist/${app_name}`;

// definir o diretório do buld para servidr o conteúdeo Angular
app.use(express.static(outputPath));
//redireciona qualquer requisção para o index.html
app.get('/*', (req, res)=>{
	res.sendFile(`${outputPath}/index.html`)
});

//ouvir a porta que o Heroku disponibilizar
app.listen(process.env.PORT);