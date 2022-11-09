"use strict";

function createForm() {
    let form = document.createElement("form");
    document.body.appendChild(form);
    
    let labelElem = document.createElement("label");
    labelElem.innerHTML = 'Радиус циферблата часов: '
    form.name='form1';
    form.appendChild(labelElem);
    let br1 = document.createElement("br");
    form.appendChild(br1);
    
    let radInput = document.createElement("input");
    radInput.type = "number";
    radInput.name = "radius";
    radInput.value = 100;
    form.appendChild(radInput);
    let br = document.createElement("br");
    form.appendChild(br);
    
    let button = document.createElement("input");
    button.type = "button";
    button.value = "Нарисовать часы";
    button.setAttribute('onclick', 'round()');
    form.appendChild(button);
}

// createForm();
updateClock();

function clockCreate(hoursAngle,minAngle,secAngle) {

    // document.getElementById('clock').clearRect(0, 0, document.getElementById('clock').width, document.getElementById('clock').height);
    
    // let clock = document.getElementById('clock');
    // console.log(clock);
    // clock.clearRect(0, 0, clock.width, clock.height);
    // console.log(clock.width, clock.height);
    
    let radius = 100;
    let hoursDistance = radius*0.8;
    
    let centerX = radius*1.1;
    let centerY = radius*1.1;
    let canvasClock = document.createElement('canvas');
    document.body.appendChild(canvasClock);
    canvasClock.id = 'clock';
    canvasClock.width = 300;
    canvasClock.height = 300;

    let clock = canvasClock.getContext('2d');
    
    clock.clearRect(0, 0, canvasClock.width, canvasClock.height);

    clock.beginPath();
    clock.strokeStyle = 'red';
    clock.arc(centerX, centerY, radius, 0, 2*Math.PI);
    clock.fillStyle = 'rgb(68, 245, 245)';
    clock.fill();
    // clock.lineWidth = 1;
    clock.stroke();
    
    
    for (let h = 1; h <= 12; h++) {    //12 hours
        clock.beginPath();
        
        const hourAngle = Math.PI*2/12*h;
        const hourX = centerX+hoursDistance*Math.sin(hourAngle);
        const hourY = centerY-hoursDistance*Math.cos(hourAngle);
        
        clock.arc(hourX, hourY, radius*0.1, 0, Math.PI*2);
        clock.strokeStyle = 'white';
        clock.fillStyle = 'yellow';
        clock.fill();
        clock.lineWidth = 1;
        clock.stroke();
        
        clock.beginPath();
        clock.textAlign="center";
        clock.textBaseline="middle";
        clock.strokeStyle = 'black';
        clock.strokeText(h, hourX, hourY);
    }    
    // document.body.removeChild(form1);
    
            clock.beginPath();
            clock.moveTo(centerX, centerY);
            clock.lineTo(centerX+0.4*centerX*Math.sin(hoursAngle), centerY-0.4*centerY*Math.cos(hoursAngle));
            clock.lineWidth = 15;
            clock.lineCap = 'round';
            clock.stroke();
            
            clock.beginPath();
            clock.moveTo(centerX, centerY);
            clock.lineTo(centerX+0.6*centerX*Math.sin(minAngle), centerY-0.6*centerY*Math.cos(minAngle));
            clock.lineWidth = 7;
            clock.strokeStyle = 'red';
            clock.lineCap = 'round';
            clock.stroke();
            
            clock.beginPath();
            clock.moveTo(centerX, centerY);
            clock.lineTo(centerX+0.8*centerX*Math.sin(secAngle), centerY-0.8*centerY*Math.cos(secAngle));
            clock.lineWidth = 3;
            clock.lineCap = 'round';
            clock.strokeStyle = 'white';
            clock.stroke();
    }
    
    
    function updateClock() {
        let currTime = new Date();
        
        const hours = currTime.getHours()%12;
        const minutes = currTime.getMinutes();
        const seconds = currTime.getSeconds();
        const msec = currTime.getMilliseconds();
        
        const secAngle = Math.PI*2/60*seconds;
        const minAngle = Math.PI*2/60*minutes;
        const hoursAngle = Math.PI*2/12*(hours+minutes/60);
        
        console.log(hours+':'+minutes+':'+seconds+'sec');
        
        clockCreate(hoursAngle,minAngle,secAngle);
        
        // setTimeout(updateClock,1000-msec);
}