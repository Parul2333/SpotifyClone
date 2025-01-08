console.log("Welcome to Spotify");

//initialize the variables
let songIndex=0;
let audioElement=new Audio('Duniyaa.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');

let songs=[
    {songName:"Duniyaa",filePath:"Duniyaa.mp3", coverPath:"s1.jpeg"},
    {songName:"Kho Gaye",filePath:"Kho Gaye.mp3", coverPath:"s2.jpeg"},
    {songName:"Kukkad",filePath:"Kukkad.mp3", coverPath:"s3.jpeg"},
    {songName:"Saadi Galli Aaja",filePath:"Saadi Galli Aaja.mp3", coverPath:"s4.jpg"},
    {songName:"Barbaadiyan",filePath:"Barbaadiyan.mp3", coverPath:"s5.jpeg"},
    {songName:"Gulabi Aankhen",filePath:"Gulabi Aankhen.mp3", coverPath:"s6.webp"},
    {songName:"Haule Haule",filePath:"Haule Haule.mp3", coverPath:"s7.jpg"},
    {songName:"Jo Tum Mere Ho",filePath:"Jo Tum Mere Ho.mp3", coverPath:"s8.jpg"},
    {songName:"Ambarsariya",filePath:"Ambarsariya.mp3", coverPath:"s9.jpg"},
    {songName:"Tujh Mein Rab Dikhta Hai",filePath:"Tujh Mein Rab Dikhta Hai.mp3", coverPath:"s10.webp"}
]

songItems.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByTagName('img')[0].src=songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName
})

//audioElement.play();
//handle play/pause events
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    //?update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
   // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays=()=>{
   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const target = e.target;
        const clickedSongIndex = parseInt(target.id);

        // If the same song is clicked again (toggle between play and pause)
        if (songIndex === clickedSongIndex) {
            if (audioElement.paused) {
                // Resume the song from where it was paused
                audioElement.play();
                target.classList.remove('fa-circle-play');
                target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            } else {
                // Pause the song
                audioElement.pause();
                target.classList.remove('fa-circle-pause');
                target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            }
        } else {
            // Play a new song
            makeAllPlays(); // Reset all other play buttons
            songIndex = clickedSongIndex;
            target.classList.remove('fa-circle-play');
            target.classList.add('fa-circle-pause');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0; // Start the new song from the beginning
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});



document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
    {
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
