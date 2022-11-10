"use strict";

function createForm() {
    let form = document.createElement("form");
    document.body.appendChild(form);
    
    let labelElem = document.createElement("label");
    labelElem.innerHTML = 'Радиус циферблата часов: '
    form.name='form1';
    form.id='form1';
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
    button.setAttribute('onclick', 'createCanvas()');
    form.appendChild(button);
}

createForm();

function createCanvas() {
    let canvasClock = document.createElement('canvas');
    document.body.appendChild(canvasClock);
    canvasClock.id = 'canvasClock';
    //2.2=radius*2*1.1(отступы)
    canvasClock.width = 2.2*document.forms.form1.radius.value;
    canvasClock.height = 2.2*document.forms.form1.radius.value;
    document.body.removeChild(form1);
    updateClock();    
};

function clockCreate(hoursAngle,minAngle,secAngle) {
    let radius = (document.getElementById('canvasClock').width/2.2);
    let hoursDistance = radius*0.8;
    //1.1-это небольшой отступ от краёв  
    let centerX = radius*1.1;
    let centerY = radius*1.1;
    
    let canvasClock = document.getElementById('canvasClock');
    
    let clock = canvasClock.getContext('2d');
    
    clock.clearRect(0, 0, canvasClock.width, canvasClock.height);
    
    clock.beginPath();
    clock.strokeStyle = 'red';
    clock.arc(centerX, centerY, radius, 0, 2*Math.PI);
    clock.fillStyle = 'rgb(68, 245, 245)';
    clock.fill();
    //radius/100 - корректировка толщины линии с привязкой к радиусу
    clock.lineWidth = radius/100;
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
        clock.fillStyle = 'black';
        //корректировка шрифта с привязкой к радиусу
        clock.font = 12*radius/100+"px Arial";
        clock.fillText(h, hourX, hourY);
        // clock.stroke();
    }    
    
    clock.beginPath();
    clock.moveTo(centerX-0.1*centerX*Math.sin(hoursAngle), centerY+0.1*centerY*Math.cos(hoursAngle));
    clock.lineTo(centerX+0.4*centerX*Math.sin(hoursAngle), centerY-0.4*centerY*Math.cos(hoursAngle));
    //корректировка толщины стрелки с привязкой к радиусу
    clock.lineWidth = 15*radius/100;
    clock.strokeStyle = 'black';
    clock.lineCap = 'round';
    clock.stroke();
            
            clock.beginPath();
            clock.moveTo(centerX-0.1*centerX*Math.sin(minAngle), centerY+0.1*centerY*Math.cos(minAngle));
            clock.lineTo(centerX+0.6*centerX*Math.sin(minAngle), centerY-0.6*centerY*Math.cos(minAngle));
            //корректировка толщины стрелки с привязкой к радиусу
            clock.lineWidth = 7*radius/100;
            clock.strokeStyle = 'red';
            clock.lineCap = 'round';
            clock.stroke();
            
            clock.beginPath();
            clock.moveTo(centerX-0.1*centerX*Math.sin(secAngle), centerY+0.1*centerY*Math.cos(secAngle));
            clock.lineTo(centerX+0.7*centerX*Math.sin(secAngle), centerY-0.7*centerY*Math.cos(secAngle));
            //корректировка толщины стрелки с привязкой к радиусу
            clock.lineWidth = 3*radius/100;
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
            
            setTimeout(updateClock,1000-msec);
        }