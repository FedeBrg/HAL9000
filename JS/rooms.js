new Vue({
    el: '#app',
    data () {
      return {
        dialog:false,
        items: [
          { title: 'Home', icon: 'house', id: 'homeNavBar'},
          { title: 'Rooms', icon: 'group_work', id: 'roomsNavBar' },
          { title: 'Devices', icon: 'perm_device_information', id: 'devicesNavBar' },
          { title: 'Routines', icon: 'alarm', id: 'routinesNavBar' },
          { title: 'Active devices', icon: 'highlight', id: 'acdevNavBar' },
        ],
        right: null
      }
    }
  })

var home = document.getElementById("homeNavBar");
home.onclick = function(){
  location.replace("index.html");
}

var rooms = document.getElementById("roomsNavBar");
rooms.onclick = function(){
  location.replace("rooms.html");
}

var devices = document.getElementById("devicesNavBar");
devices.onclick = function(){
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

var addRoom = document.getElementById("addBtn");
addRoom.onclick = function(){
  dialog: true;
}