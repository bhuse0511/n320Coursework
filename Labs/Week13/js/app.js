//applcation level stuff
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas,true);

//app variables
var camera, scene, ball, goal, timoutId, particleSystem;


//create scene
scene = createScene();

engine.runRenderLoop(function(){
    scene.redner();
})

scene.registerAfterRender(function(){
    if(ball.intersectsMesh(goal, false)){

        //move goal 
        goal.position.x = Math.random() *8-4;

        //play a particle burst
        particleSystem.manualEmitCount = 21;
        particleSystem.start();

        //position particltes
        particleSystem.minEmitBox = ball.position;
        particleSystem.maxEmitBox = ball.position;

        //put ball back
        resetBall();
    }
})

function createScene(){
    var scene = new BABYLON.scene(engine);

    //sbassic scene settup
    camera = new BABYLON.UniversalCamera("UC", new BABYLON.Vector3(0,0,-15), scene);
    var light = new BABYLON.directionalLight("lighty", new BABYLON.Vector3(0,-.35,1), scene);

    //enabel physcis
    var gravityVector = BABYLON.Vector3(0, -9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    ball = BABYLON.meshBuilder.createSphere("sphero", { diameter: 1 }, scene);
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(
        ball, BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1, restitution: .2 }.scene
    );

    //setup ground for ball to exist on 
    var ground = BABYLON.meshBuilder.createGround("ground", { height: 20, width: 20, subdevisions: 4 }, scene);
    ground.position.y = -3;
    ground.position.z = 9;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
            ground, BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0.9, }, scene
        );

    
    //make the goal
    goal = new BABYLON.MeshBuilder.CreateBox("goal", { height: 5, width: 5 }, scene);
    goal.position.z = 7;
    goal.position.x = Math.random() *8-4;
    
    //make the particle system
    particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.emitter = new BABYLON.Vector3(0,0,0);
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.addVelocityGradient(0,2);

    //load particle texture
    particleSystem.particleTexture = new BABYLON.Textrue("images/particle.png", scene);


    return scene;

}

function resetBall(){
    //reset position
    ball.position = new BABYLON.Vector3

    //restet velocity
    ball.physicsImpostor.setLinearVelocity( new BABYLON.Vector3());
    ball.physicsImpostor.setAngularVelocity( new BABYLON.Vector3());

    //get rid of tiemout if it s tsil on
    clearTimeout( timeoutId );
}

window.addEventListener("click", function(){
    //get mesh that was clicked on 
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh;

    //null check
    if(selectedObject) {

        //get a directon away from where the suse clicke on the ball
        var surfaceNormal = pickResult.getNormal(true);
        var forceDirection = surfaceNormal.scale(-1000);

        //kick the object
        selectedObject.physicsImpostor.applyForce(
            forceDirection,
            selectedObject.getAbsolutePosition()
        )

        //reset ball after 3 secdons
        timeoutId = setTimeOut(resetBall, 3000);
    }
})
