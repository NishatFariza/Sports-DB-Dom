const loadPlayers = () =>{
    document.getElementById('player-container').innerHTML="";
    document.getElementById('spinner').style.display="block"
    const searchValue = document.getElementById("search-input").value;

    if(searchValue == "" || isNaN(searchValue) == false){
            alert('please enter valid input')
            document.getElementById('spinner').style.display="none"
            document.getElementById('player-container').innerHTML="";
            document.getElementById('search-input').value="";
            document.getElementById('players-details').innerHTML="";
        }
    else{
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
    .then( res => res.json())
    .then(data => {
        // console.log(data.player ==null);
        if(data.player == null){
            
            setTimeout(()=>{
                document.getElementById('spinner').style.display="none"
                alert('This content is not avaiable')
                document.getElementById('search-input').value="";
                //  console.log('hhhhhhhhhhh')
                document.getElementById('player-container').innerHTML="";
            }, 5000)
          
            
        }
        else{
            searchPlayers(data.player)
             document.getElementById('spinner').style.display="none"
             document.getElementById('search-input').value="";
             
          
        }
    })
    // searchValue.value="";
    }
}

const searchPlayers = players =>{ 
    if(players ==null){
        alert('This content is not available')
    }
    
    console.log(players)
    for(const player of players){ 
        console.log(player)
        const playerContainer =document.getElementById('player-container');
        // document.getElementById('player-container').innerHTML="";
        const div =document.createElement('div');
        const {strThumb, strPlayer, strNationality, idPlayer}=player
        div.innerHTML =`<div class="card border border-3 py-5 mb-4 rounded-3">
         <div class="mb-3"><img class="w-50 rounded-3" src="${strThumb}" /></div>
         <h2>Name: ${strPlayer}</h2>
         <h3>Country: ${strNationality}</h3>
         <div class="all-buttons pt-3">
         <button class="py-2 px-4 btn btn-dark">Delete</button>
         <button class="py-2 px-4 btn btn-primary" onclick="playerId(${idPlayer})">Player Details</button>
         </div>
        </div>
        `;
        playerContainer.appendChild(div)
    }
    document.getElementById('search-input').value="";
}

const playerId = (id) =>{
    document.getElementById('players-details').innerHTML="";
    const idUrl =(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`)
    fetch(idUrl)
    .then(res => res.json())
    .then(player1 =>  playerDetails(player1.players[0]))

}

const playerDetails = (details) =>{
    // console.log(details)
    const singlePlayer =document.getElementById('players-details');
    const div1 =document.createElement('div');
    const {strThumb, strPlayer, strNationality}=details
    div1.innerHTML =`<div class="card border border-3 py-5 my-5 rounded-3">
    <div class="mb-3">
    <img class="w-50 rounded-3" src="${strThumb}" />
    </div>
    <h2>Name: ${strPlayer}</h2>
    <h3>Country: ${strNationality}</h3>
   </div>
    `;
    singlePlayer.appendChild(div1)
}