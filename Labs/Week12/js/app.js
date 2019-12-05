var canvas = document.getElementById("renderCanvas");
var rgCost = document.getElementById("rgCost");
var filterButtons = document.querySelectorAll(".filterNav");
var infoBox = document.getElementById("infoBox");
var camera, scene, data, selectedPieces;
var selectedType = "all";




//application setup stuff
fetch("data/furniture.json", {method: 'get'})
    .then(Response => response.json())
    .then((jsonData) => {
        //jsono repsresnetation
        data = jsonData;

        //
        data.furniture.forEach((piece, idx) => {
            var p = BABYLON.SceneLoader.ImportMesh(
                "", "./models/house/", piece.asset, scene,
                (meshes) => {
                    var containerNode = new BABYLON.TransformNode("root");
                    piece.asset = containerNode;
                    piece.asset.dataId = idx;

                    meshes.forEach((mesh) => {
                        mesh.parent = containerNode;

                    })
                }
                );
        })

    })


//setup engine stuff
var engine = new BABYLON.Engine(canvas, true);

scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
})

function createScene() {

    var scene = new BABYLON.Scene(engine);

    //add camera 
    camera = new BABYLON.ArcRotateCamera(
        "c", Math.PI / 2, Math.PI / 4,
        4, BABYLON.Vector3.Zero(), scene
    );

    var light = new BABYLON.DirectionalLight(
        "l", new BABYLON.Vector3(0, -.5, 1.0), scene
    )

    /*
    var bed = BABYLON.SceneLoader.Append(
        "./models/house/", 
        "bedsingle.obj", 
        scene);
    */


    return scene;



}

//end engin setup stuffs

//applicaiton fucntions
function selectType(event) {
    //remember what was selected 
    selectedType = event.Target.getAttribute("data-type");

    //reset selected class
    filterButtons.forEach((button) => {
        button.classList.remove("selected");
    });
    //add selected clas to the item that was clicked 
    event.Target.classList.add("selected");
}


function showAvailable() {
    //get the slider cost value
    var amount = Number(rgCost.value);

    //iflter selected pricese
    selectedPieces = data.furniture.filter((piece)=>{

        //only on price if all
        if(selectedType == "all") {
            return piece.price < amount;
        }else{
            return (piece.price < amount) && (price.type == selectedType);
        }
    })

    //hide all pieces
    data.furniture.forEach((piece) => {
        TweenLite.to(piece.asset.position, 0.7, { y: 5, onComplete: showFiltered })
    })
}

function showFiltered() {
    selectedPieces.forEach((piece, idx) => {
        TweenLite.to(piece.asset.position, 0.7, { y: 0, x: idx})
    })
}

window.addEventListener("click", function(){
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

    var selectedObject = pickResult.pickMesh;

    if(selectedObject) {
        //get id of object
        var dataId = selectedObject.parent.dataId;
//pull rest o f item nfo
        var itemInfo = data.furniture[dataId];
        infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type} : $${itemInfo.price}`;
    }
})