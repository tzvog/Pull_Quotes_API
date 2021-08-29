// imported libraries 
const express = require('express');
const app = express(); 
const Enum = require('enum');

// local files
const kanye = require('./kanye.js');
const chuck = require('./chuck.js');
const name_parse = require('./nameParse.js'); 
const responses = require('./response'); 

// const variables 
const cutoff_year = 2000; 

// local varriables
var total_request_counter = {}; 
var distribution_keys = {}; 

app.get('/api/surprise' ,(req, res) => {

    function success(type ,handle_res)
    {
        res.status(200).json({type: type, result: handle_res});
    }

    // checks if we the right amount of parameters and correct ones
    if ( typeof (req.query.birth_year) === 'undefined' || 
        typeof (req.query.name) === 'undefined' || 
        Object.keys(req.query).length != 2)
    {
        responses.fail(res); 
        return; 
    }

    // converts the number to and int
    const birth_year = parseInt(req.query.birth_year); 

    // checks if the birthyear is an actual number
    if(isNaN(birth_year))
    {
        responses.fail(res);
        return;  
    }

    chuck.response(success);
    // name_parse.response(req.query.name, success);
    // kanye.response(success);

    // if(birth_year <= cutoff_year)
    // {
    //     chuck.response(success); 
    //     return; 
    // }
    // else
    // {
    //     if(req.query.name[0] != 'A' && req.query.name[0] != 'Z')
    //     {
    //         kanye.response(success);
    //         return;  
    //     }
    // }

    // if(req.query.name[0] != 'Q')
    // {
    //     name_parse(req.query.name, success);
    //     return; 
    // }


    // responses.fail(res); 
});

function init()
{
    total_request_counter["requests"] = 0; 
    total_request_counter["distribution"] = []; 

    types = [chuck.type, kanye.type, name_parse.type]; 
    
    types.forEach((item, index, array) => {
        total_request_counter["distribution"].push({"type": item, "count": 0}); 
        distribution_keys[item] = index;
    })
}

init();

app.listen(3000, console.log("Listening on port"));


