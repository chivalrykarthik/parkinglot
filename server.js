const readline = require('readline');
const controller = require('./controller.js');
const reloadTime = 1000;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('close',()=>{console.log("Closing the applicaitonc")})

function showMenus() {
    console.log("1. List");
    console.log("2. Park");
    console.log("3. UnPark");
    console.log("4. Quit");
    rl.question("Enter your choice\n", input => {
        
        if (input !== '4') {
            let onGettingResp = (err, resp) => {
                if (err) {                    
                    console.log(err);
                    setTimeout(showMenus,reloadTime);
                    return;
                }
                setTimeout(showMenus,reloadTime);
            }, obj = { input: input, rl: rl };
            controller.processInput(obj, onGettingResp);
        }else{
            rl.close();
        }
    });
}

function setParking(){
    rl.question("Enter the parking capacity \n",num=>{
        let onGettingParing = (err,num)=>{
            if (err) {
                
                console.log(err);
                setParking();
                return;
            }
            showMenus();
        }
        controller.setParking(num,onGettingParing);
    });
}
setParking();

/*rl.on('line', input => {
    console.log("reding input")
    if (input !== 'q' && input !== 'Q') {
        let onGettingResp = (err,resp)=>{
            if(err){
                //console.log("Sorry we cannot process the request now");
                console.log(err);
                return;
            }
            console.log(resp);
        };
        controller.processInput(input,onGettingResp);
    }else{
        rl.close();  
    }
    
}).on('close', () => {
    console.log("Closing the application");
});*/