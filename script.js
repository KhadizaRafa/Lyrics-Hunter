const baseUrl = 'https://api.lyrics.ovh/';

function getSongLists(){
    const input = document.getElementById('song-search').value;
    if(input){
        url = `${baseUrl}/suggest/${input}`;
        fetch(url)
            .then(response => response.json())
            .then(data => showResults(data))
    }
    else{
        alert("Please provide right value in search box") //show error if input is null
    }
}

function getLyrics(author,title){
    url = `${baseUrl}/v1/${author}/${title}`;
    
    document.getElementById('songTitle').innerHTML = '';
    document.getElementById('showLyrics').innerHTML = '';

    fetch(url)
    .then(response => response.json())
    .then(data => 
    {
        let lyrics = data.lyrics;
        if(data.error)
        {
            lyrics = 'No lyrics found'; //if got 404 from lyrics api
        }
        
        document.getElementById('songTitle').innerText = title;
        document.getElementById('showLyrics').innerText = lyrics;
    } )
    
}
const getValueFromResultObj = (data,i) => {
    const initalObj = data.data[i];
    const newData = {
        title : initalObj.title,
        album :  initalObj.album.title,
        album_cover : initalObj.album.cover_medium,
        artist : initalObj.artist.name,
        artist_url : initalObj.artist.link,
        artist_img : initalObj.artist.picture   
    }
    return newData;

}


const showResults = data => {

    const resList = document.getElementById('search_results');
    resList.innerHTML = '';
    const fancyList = document.getElementById('fancy-result');
    fancyList.innerHTML = '';
  
    for (var i = 0; i < 10; i++) {
      const newDataObj = getValueFromResultObj(data,i);  
       
      resList.innerHTML += 
    `<div class="row search_item d-flex justify-content-between">
        <div class="md-col-7">
             <p class="author lead"><strong>${newDataObj.title}</strong> </p>
             <p>Album:<span>  ${newDataObj.album}</span> by <strong style="font-size: 20px;">${newDataObj.artist}</strong></p>

            <button class="btn btn-success mt-2" onclick="getLyrics('${newDataObj.artist}','${newDataObj.title}')">Get Lyrics
            </button>  

        </div>
        <div class="md-col-4">
            <img src="${newDataObj.artist_img}" class="rounded-circle" alt="No Image Found"> 
            <br>
              
         </div>
    </div>`




        fancyList.innerHTML += 
        `<div class ="col-md-6">
            <div class= "row fancy-item">
            <div class="col-md-6  text-md-center">
                <img src="${newDataObj.album_cover}" class="rounded w-100"  alt="No Image Found">
            
             </div>
            <div class="col-md-6 w-100">
            
                 <h3 class="lyrics-name pb-2">${newDataObj.title}</h3>        
            
                 <h5 class="author lead"> Artist: <span>${newDataObj.artist}</span></h5>
                 <p>Album Name: <span>${newDataObj.album}</span></p>
                 <p class="author lead" ><a href='${newDataObj.artist_url}' target="_blank">Get to know us</a></p>


                 <button class="btn btn-success " onclick="getLyrics('${newDataObj.artist}','${newDataObj.title}')">Get Lyrics</button>
             </div>
        </div>
    </div>`
        

    }
    
  }