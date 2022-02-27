const loadPlayers = () =>{
    const searchValue = document.getElementById("search-input").value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
    .then( res => res.json())
    .then(data => searchPlayers(data.player))
}

const searchPlayers = players =>{ 
    // console.log(players)
    for(const player of players){
        const playerContainer =document.getElementById('player-container');
        const div =document.createElement('div');
        const {strThumb, strPlayer, strNationality, idPlayer}=player
        div.innerHTML =`
         <img class="w-50" src="${strThumb}" />
         <h2>Name: ${strPlayer}</h2>
         <h3>Country: ${strNationality}</h3>
         <button onclick="playerId(${idPlayer})">Player Details</button>
      
        `;
        playerContainer.appendChild(div)
    }
  
}

const playerId = (id) =>{
    const idUrl =(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`)
    fetch(idUrl)
    .then(res => res.json())
    .then(player1 =>  playerDetails(player1.players[0]))

}

const playerDetails = (details) =>{
    console.log(details)
    const singlePlayer =document.getElementById('players-details');
    const div1 =document.createElement('div');
    const {strThumb, strPlayer, strNationality}=details
    div1.innerHTML =`
     <img class="w-50" src="${strThumb}" />
     <h2>Name: ${strPlayer}</h2>
     <h3>Country: ${strNationality}</h3>
    `;
    singlePlayer.appendChild(div1)
}