const express=require('express');
const hbs=require('hbs');
const path=require('path');

const app=express();

const port=process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"../public")));
app.set('view engine','hbs');

// hbs.registerPartials(partialspath);
hbs.registerPartials(path.join(__dirname,"../views/partials"));
const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '20',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '52456e3c-fa14-46ad-9ede-329fbd43b7c6'
  },
  json: true,
};
// setInterval(()=>{},5000)s
app.get("/",(req,res)=>{
  rp(requestOptions).then(response => {
    console.log('API call response:', response);

    res.status(200).render('index',{
      cryptoData:response
    }
    );
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
})


// setInterval(apicall, 5000);

app.listen(port,()=>{
  console.log(`listinig from port ${port}`);
})