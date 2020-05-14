if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope:',  registration.scope);
    }).catch(function(error) {
        console.log('ServiceWorker registration failed:', error);
    });
}

// if(window.DeviceMotionEvent) {
//     window.addEventListener("devicemotion", function(event){
//         var x = event.accelerationIncludingGravity.x;
//         var y = event.accelerationIncludingGravity.y;
//         var z = event.accelerationIncludingGravity.z;
//         document.getElementById("motion").innerHTML = "<ul><li>X : " + x + "</li><li>Y : " + y + "</li><li>Z : " + z + "</li></ul>";
//     });
// } else {
//     document.getElementById("motion").innerHTML = "<p>L'appareil ne supporte pas le Device Motion.</p>";
// }

// if(window.DeviceOrientationEvent) {
//     window.addEventListener("deviceorientation", function(event){
//         var alpha = event.alpha;
//         var beta = event.beta;
//         var gamma = event.gamma;
//         document.getElementById("orientation").innerHTML = "<ul><li>Alpha : " + alpha + "</li><li>Beta : " + beta + "</li><li>Gamma : " + gamma + "</li></ul>"; 
//     });
// } else {
//     document.getElementById("motion").innerHTML = "<p>L'appareil ne supporte pas le Device orientation.</p>";
// }

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    var sn = document.querySelectorAll('.sidenav');
    var instances2 = M.Sidenav.init(sn);

    console.log("Nom : "+localStorage.getItem("characterName"));
    var chf = document.getElementById('characterHF');
    var cr = document.getElementById('characterReput');

    var myName = localStorage.getItem('characterName');
    var splitted = myName.slice(1,myName.length);

    var charName = myName[0].toUpperCase() + splitted;

    chf.innerHTML += charName;
    cr.innerHTML += charName;
});

function setParams(cname, cserver){
    localStorage.setItem("characterName", cname);
    localStorage.setItem("server", cserver);
}

function getToken(){
    var name = document.getElementById('character_name').value.toLowerCase();
    var dropdown = document.getElementById('server');
    var serv = dropdown.options[dropdown.selectedIndex].value;

    setParams(name, serv);

    console.log(name);
    console.log(serv);


    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://eu.battle.net/oauth/token?client_id=b3366d2013644db1a5724faa77d6cdbe&client_secret=P9bPqtlDsLpd64mRTB4nPmJBlVk8Ma5c&grant_type=client_credentials', true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if(request.status == 200)
        {
            localStorage.setItem("accessToken", data['access_token']);
            window.location.href = "/main";
        }
        else
        {
            console.log("Erreur "+request.status);
        }
    }

    // Send request
    request.send()
}

function getAchievements(){
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://eu.api.blizzard.com/profile/wow/character/'+localStorage.getItem('server')+'/'+localStorage.getItem('characterName')+'/achievements?namespace=profile-eu&locale=fr_FR&access_token='+localStorage.getItem('accessToken'), true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if(request.status == 200)
        {
            var ach_data = document.getElementById('ach_list');
            console.log(data);
            for(var i in data.achievements)
            {
                if(data.achievements[i].criteria != null)
                {
                    var completed = data.achievements[i].criteria.is_completed == true ? '<span class="green-text">Complété</span>' : '<span class="red-text">Non complété</span>';

                    ach_data.innerHTML += `
                    <div class="row">
                        <div class="col s12 m6 offset-m3">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                            <span class="card-title">`+data.achievements[i].achievement.name+`</span>
                            <p>`+completed+`</p>
                            </div>
                        </div>
                        </div>
                    </div>`;
                }
            }
        }
        else
        {
            console.log("Erreur "+request.status);
        }
    }

    // Send request
    request.send()
}

function getReputations(){
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://eu.api.blizzard.com/profile/wow/character/'+localStorage.getItem('server')+'/'+localStorage.getItem('characterName')+'/reputations?namespace=profile-eu&locale=fr_FR&access_token='+localStorage.getItem('accessToken'), true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if(request.status == 200)
        {
            var rep_data = document.getElementById('rep_list');
            console.log(data);
            for(var i in data.reputations)
            {
                var score = data.reputations[i].standing.name + " : " + data.reputations[i].standing.value + '/' + data.reputations[i].standing.max;
                rep_data.innerHTML += `
                <div class="row">
                    <div class="col s12 m6 offset-m3">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                        <span class="card-title">`+data.reputations[i].faction.name+`</span>
                        <p>`+score+`</p>
                        </div>
                    </div>
                    </div>
                </div>`;
            }
        }
        else
        {
            console.log("Erreur "+request.status);
        }
    }

    // Send request
    request.send()
}

function reput(){
    var reput = document.getElementById('reputations');
    var hf = document.getElementById('achievements');
    reput.style.display = "block";
    hf.style.display = "none";
}

function achieve(){
    var reput = document.getElementById('reputations');
    var hf = document.getElementById('achievements');
    reput.style.display = "none";
    hf.style.display = "block";
}