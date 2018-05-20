const cache = require('memory-cache');


let parkingLot = {};
parkingLot.menu = ["listCars", "parkCars", "unParkCars"];
parkingLot.checkCache = function (cb) {
    let parkingSpace = cache.get('parkingSpace');
    if (!parkingSpace) {
        let parkingSize = cache.get('parkingSize');
        parkingSpace = '0'.repeat(parkingSize).split('');
        cache.put('parkingSpace', parkingSpace);
        
    }
    cb(null, parkingSpace);
};

parkingLot.setParkingCache = function (parkingSpace, cb) {
    if (parkingSpace) {
        cache.put('parkingSpace', parkingSpace);
    }
    cb(null);
};

parkingLot.listCars = function (obj, cb) {
    let { input, rl, parkingSpace } = obj;
    let list = parkingSpace.reduce((acc,val,key)=>{
       
        if(val !== "0"){
            acc+=`CarNo ${val} is parked at slotNo ${key} \n`;            
        }
        return acc;
    },'');
    
    if(!list){
        console.log("No Cars in the parking");
    }else{
        console.log(list);
    }
    cb(null);
};
parkingLot.parkCars = function (obj, cb) {
    let { input, rl, parkingSpace } = obj;
    let parkingPlace = parkingSpace.indexOf("0");
    if (parkingPlace === -1) {
        cb("Parking is full");        
        return;
    }
    rl.question(`Enter the carNo \n`, carNo => {
        if(!carNo){
            return cb("Invalid carNo");
        }
        parkingSpace[parkingPlace] = carNo;        
        this.setParkingCache(parkingSpace, () => {
            console.log(`CarNo ${carNo} is parked`);
            cb(null);
        });

    });
};

parkingLot.unParkCars = function(obj,cb){
    let { input, rl, parkingSpace } = obj;
    rl.question(`Enter the carNo \n`,carNo=>{          
        
        let parkingPlace = parkingSpace.indexOf(carNo.toString());
        if(parkingSpace.indexOf===-1){
            return cb("Invaid carNo");
        }
        parkingSpace[parkingPlace] = "0";
        console.log(`CarNo ${carNo} is unparked from slotNO ${parkingPlace}`);
        return cb(null);
    });
}

parkingLot.processInput = function (obj, cb) {
    let { input, rl } = obj;

    if (!Number(input)) {
        return cb("Invaid choice");
    }
    let rootInput = (err, parkingSpace) => {
        if (err) {
            return cb(err);
        }
        let option = input - 1;
        if (!parkingLot.menu[option]) {
            return cb("Invaid choice");
        }
        //console.log(parkingLot.menu[option]);
        obj.parkingSpace = parkingSpace;
        return this[parkingLot.menu[option]](obj, cb);
    };
    this.checkCache(rootInput);
    //cb(null, input);
    return;
};

parkingLot.setParking = function (num, cb) {
    if (!Number(num)) {
        return cb("Invalid parking size. Try again");
    }
    cache.put('parkingSize', num)
    return cb(null);
}
module.exports = parkingLot;