class Ambulence {
    constructor() {
        this.cars = [];
    }

    addCars(car) {
        this.cars.push(car);
    }

    
    siren() {
        this.cars.forEach(function (car) {
            car.pullOver();
        })
    }
    
    honk() {
        
    }
}


