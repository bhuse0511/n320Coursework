var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var camera, sphere;

var scene = createScene();

function createScene(){
    var scene = new BABYLON.Scene(engine);

    // cameara work
    camera = new BABYLON.ArcRotateCamera(
        "Camera", Math.PI / 2, Math.PI / 4, 
        4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);


    //adding objects
    sphere = BABYLON
                .MeshBuilder
                .CreateSphere("sphere", {diameter: .7}, scene);


    //add light
    var light = BABYLON.HemisphericLight("HemiLight",
                new BABYLON.Vector3(1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 0 ,1);


    return scene;
}

engine.runRenderLoop(function () {

    scene.render();
});