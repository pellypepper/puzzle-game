// puzzle preview
function previewImage(){
    var display = document.getElementsByClassName("answer_image")[0]
    display.classList.add("image_show")
    

    var image = document.getElementById("image_click")
    image.addEventListener("click", function(){
        display.classList.remove("image_show")
        
    })

}
// generate random positiom

var MovesCount=0
function randomPos(){
    var arr = [];
    while(arr.length < 12){
        var r = ((Math.floor(Math.random() * 3)+1).toString())+((Math.floor(Math.random() * 4)+1).toString()); // generate random number
        if(arr.indexOf(r) === -1)  arr.push(r); // check if r exist in array
    }
    return arr  // [11,21,31,41,12,22,32,42,13,23,,33,43,14,24,34,44]
}



var RandomPos=randomPos()
// set each tile t row / column
for(let i =0;i<document.getElementsByClassName("tile").length;i++){
    document.getElementsByClassName("tile")[i].style.gridArea=RandomPos[i][0]+"/"+RandomPos[i][1]
}

// [Move tile left, right, up and down
function moveMe(tile){
    var EmptyTile=document.querySelector(".emtile")
    var Possibilties=[
        parseInt(RandomPos[tile][0])+1==parseInt(RandomPos[11][0])&&parseInt(RandomPos[tile][1])==parseInt(RandomPos[11][1]), //if tile move right
        parseInt(RandomPos[tile][0])-1==parseInt(RandomPos[11][0])&&parseInt(RandomPos[tile][1])==parseInt(RandomPos[11][1]),//if tile move left
        parseInt(RandomPos[tile][1])+1==parseInt(RandomPos[11][1])&&parseInt(RandomPos[tile][0])==parseInt(RandomPos[11][0]), //if tile move up
        parseInt(RandomPos[tile][1])-1==parseInt(RandomPos[11][1])&&parseInt(RandomPos[tile][0])==parseInt(RandomPos[11][0]), //if tile move down
    ]

    //if any possibilities is true
if(Possibilties[0]||Possibilties[1]||Possibilties[2]||Possibilties[3]){
    MovesCount++;
    EmptyTile.style.gridArea=RandomPos[tile][0]+"/"+RandomPos[tile][1];
    document.querySelectorAll(".tile")[tile].style.gridArea=RandomPos[11][0]+"/"+RandomPos[11][1];
    //swap position
    var CurrentTile=RandomPos[tile]
    RandomPos[tile]=RandomPos[11]
    RandomPos[11]=CurrentTile;

    // Game correct positon
    NeededPos=["11","12","13","14","21","22","23","24","31","32","33","34"]
    if(RandomPos.join(".")==NeededPos.join(".")){
        console.log("Game Beated");
        document.querySelector(".blscreen").style.display='flex'
        document.querySelector(".MovesCount").innerHTML=MovesCount;
        var stars=0;
        if(MovesCount<100){
            stars=3
        }else if(MovesCount<200){
            stars=2
        }else if(MovesCount<300){
            stars=1
        }else{
            stars=0
        }
        for(let i=0;i<2;i++){
            document.getElementsByTagName("path").style.fill="yellow"
        }
    }
}
}