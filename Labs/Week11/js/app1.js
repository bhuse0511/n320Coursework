let canvas = document.querySelector(".renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let camera, sphere, light, blueMat, greenMat;
let boxes = [];

let selectedMesh = null;

let scene = createScene();

function createScene() {
    // create scene space
    let scene = new BABYLON.Scene(engine);

    // create camera and attach to canvas
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    
    let myLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);

    boxes[1] = BABYLON.MeshBuilder.CreateBox("box1", {size: .7}, scene);
    boxes[2] = BABYLON.MeshBuilder.CreateBox("box2", {size: .3}, scene);
    boxes[0] = BABYLON.MeshBuilder.CreateBox("box3", {size: .9}, scene);
    boxes[2].position.x = 1;
    boxes[0].position.x = -1.5;
    
    // Add and manipulate meshes in the scene
    light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene);

    blueMat = new BABYLON.StandardMaterial("blue", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.emissiveColor = BABYLON.Color3.Blue();

    greenMat = new BABYLON.StandardMaterial("blue", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    greenMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    greenMat.emissiveColor = BABYLON.Color3.Green();

    return scene;
};

function checkUp() {
    // looping through each box
    boxes.forEach(function(b) {
        // if all of the rotations are the same
        if(boxes[0].rotation.x == boxes[1].rotation.x 
            && boxes[1].rotation.x == boxes[2].rotation.x) {
                // change it green
            b.material = greenMat;
        } else {
            b.material = null;
        }
    });
    selectedMesh.material = blueMat;
}

window.addEventListener("click", function(event) {
    let pickResult = scene.pick(scene.pointerX, scene.pointerY);

    // if there's a box already selected
    if(selectedMesh) {
        // change it green if there are any green boxes
        if(boxes[0].material == greenMat || boxes[1].material == greenMat || boxes[2].material == greenMat) {
            selectedMesh.material = greenMat;
        } else {
            // otherwise make it white
            selectedMesh.material = null;
        }
    }

    // make sure you clicked on a box
    if(pickResult.pickedMesh){
        // change the color of what you clicked blue
        pickResult.pickedMesh.material = blueMat;
    
        selectedMesh = pickResult.pickedMesh;
    } else {
        selectedMesh = null;
    }
})

window.addEventListener("keydown", function(event) {
    this.console.log(event.keyCode);
    if(selectedMesh) {
        if(event.keyCode == 87) {
            // rotating x axis
            TweenLite.to(selectedMesh.rotation, 1, { x: "+=20" /* this numbr is how much it rotates */, onComplete: checkUp });
        }else if(event.keyCode == 83) {
            TweenLite.to(selectedMesh.rotation, 1, { x: "-=20", onComplete: checkUp });
        }
    }
});



engine.runRenderLoop(function() {
    scene.render();
});