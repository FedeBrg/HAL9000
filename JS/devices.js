var vue = new Vue({
    el: '#app',
    data: function () {
      return {
        dialog:false,
        items: [
          { title: 'Home', icon: 'house', id: 'homeNavBar'},
          { title: 'Rooms', icon: 'group_work', id: 'roomsNavBar' },
          { title: 'Devices', icon: 'perm_device_information', id: 'devicesNavBar' },
          { title: 'Routines', icon: 'alarm', id: 'routinesNavBar' },
          { title: 'Active devices', icon: 'highlight', id: 'acdevNavBar' },
        ],
        right: null,
        devices: [],
        options: [{name: 'Air Conditioner', value:0, id: 'li6cbv5sdlatti0j'}, 
                  {name: 'Alarm', value: 1, id: 'mxztsyjzsrq7iaqc'}, 
                  {name: 'Curtains', value: 2, id: 'eu0v2xgprrhhg41g'}, 
                  {name: 'Door', value: 3, id: 'lsf78ly0eqrjbz91'}, 
                  {name: 'Fridge', value: 4, id: 'rnizejqr2di0okho'}, 
                  {name: 'Light', value: 5, id: 'go46xmbqeomjrsjr'}, 
                  {name: 'Oven', value: 6, id: 'im77xxyulpegfmv8'}, 
                  {name: 'Timer', value: 7, id: 'ofglvd9gqX8yfl3l'}]
      }
    },

    methods: {
      addDev: function(device){
        device.image = getImg(device.typeId);
        this.devices.push(device);
      },

      loadDevices: function(devs){
          for(var i = 0; i < devs.devices.length; i++){
            this.devices.push(devs.devices[i]);
            this.devices[i].image = getImg(devs.devices[i].typeId);  
          }
      },

      getId(index){
        return this.options[index].id;
      }
    }
  })

var api = class {
  static get baseUrl() {
    return "http://127.0.0.1:8080/api/";
  }

  static get timeout() {
    return 60 * 1000;
  }

  static fetch(url, init) {
    return new Promise(function(resolve, reject) {
      var timeout = setTimeout(function() {
        reject(new Error('Time out'));
      }, api.timeout);

      fetch(url, init)
      .then(function(response) {
        clearTimeout(timeout);
          if (!response.ok)
            reject(new Error(response.statusText));

          return response.json();
      })
      .then(function(data) {
          resolve(data);
      })
      .catch(function(error) {
          reject(error);
      });
    });
  }
}

api.device = class {
  static get url() {
    return api.baseUrl + "devices/";
  }

  static add(device) {
   return api.fetch(api.device.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(device)
    });
  }

  static modify(room) {
    return api.fetch(api.room.url + room.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(room)
    });
  }

  static delete(id) {
    return api.fetch(api.room.url + id, {
      method: 'DELETE',
    }); 
  }

  static get(id) {
    return api.fetch(api.room.url + id);
  }

  static getAll() {
    return api.fetch(api.device.url);
  }
}

api.model = api.model || {};

api.model.device = class {
  constructor(id, typeid, name, image, meta) {
    if(id){
      this.id = id;
    }

    this.typeId = typeid;
    this.name = name;
    if(image){
      this.image = image;
    }
    
    this.meta = meta;
  }
}

window.addEventListener('load', function() {
  api.device.getAll()
    .then((data) => {
      vue.loadDevices(data);
    })
    
    .catch((error) => {
      alert("Unable to load: " + error);
    });
}, false);

var home = document.getElementById("homeNavBar");
home.onclick = function(){
  location.replace("index.html");
}

var rooms = document.getElementById("roomsNavBar");
rooms.onclick = function(){
  location.replace("rooms.html");
}

var dev = document.getElementById("devicesNavBar");
dev.onclick = function(){
  location.replace("devices.html");
}

var routines = document.getElementById("routinesNavBar");
routines.onclick = function(){
  location.replace("routines.html");
} 

var actdev = document.getElementById("acdevNavBar");
actdev.onclick = function(){
  location.replace("active-devices.html");
}

var addDevice = document.getElementById("addBtn");
addDevice.onclick = function(){
  dialog: true;
}

var submitBtn = document.getElementById("submitBtn");
submitBtn.onclick = function(){
  var devName = document.getElementById("devName").value;
  var devType = document.getElementById("devType").value;
  var type = vue.getId(devType);
  var device = new api.model.device(null, type, devName, null, null);

  api.device.add(device)
    .then((data) => {
      device.id = data.device.id;
      vue.addDev(device);
    })
    
    .catch((error) => {
      alert("Unable to create " + error);
    });
  }

  

  function getImg(devType){
    switch(devType){
      case "eu0v2xgprrhhg41g":
        return "./rsc/devices/Curtains.png";
      case "go46xmbqeomjrsjr":
        return "./rsc/devices/Light.png";
      case "im77xxyulpegfmv8":
        return "./rsc/devices/Oven.png";
      case "li6cbv5sdlatti0j":
        return "./rsc/devices/AirConditioner.png";
      case "lsf78ly0eqrjbz91":
        return "./rsc/devices/Door.png";
      case "mxztsyjzsrq7iaqc":
        return "./rsc/devices/Alarm.png";
      case "ofglvd9gqX8yfl3l":
        return "./rsc/devices/timer.jpg";
      case "rnizejqr2di0okho":
        return "./rsc/devices/Fridge.png";
      default:
        return "No-image";
    }
  }
  /*
   var room = { name: devName };
   var json = JSON.stringify(room);
   alert(json);

   fetch("http://127.0.0.1:8080/api/rooms", { method: "POST", body: json, headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }})
      .then(function(response) {
        if (!response.ok)
           reject(new Error(response.statusText));

          console.log("adentro del fetch");
          return response.json();
      })
      .then(function(data) {
          console.log("adentro del json");
          alert(data.room.id);
      })
      .catch(function(error) {
          alert(error);
      });
      console.log("afuera del fetch");
*/