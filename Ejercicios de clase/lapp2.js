console.log("hola desde node");

const filesystem = require('fs');

filesystem.writeFileSync('hola.txt', 'Hola desde node');

setTimeout(()=>{
    console.log("jojojo te hackié");
},11000);

const arreglo =[5000,60,90,100,10,20,1000,0,120,2000,340,1000,50];

for(let item of arreglo){
    setTimeout(()=>{
        console.log(item);
    },item);
}