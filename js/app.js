var scene, camera, renderer, pyramidmatVillain;
var min = -0.5;
var max = 0.5;

function createScene() {
  scene = new THREE.Scene();
  initCameraTopo();

  /*var novacamera = new THREE.OrthographicCamera(5, -5, 5, -5, 3, 10);
  novacamera.position.set(0, 0, 6);
  var helper = new THREE.CameraHelper(novacamera);
  scene.add(helper);*/

  heroShip();
  villainShip();
  cenario();
}

function initCameraTopo() {
  camTopo = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camTopo.position.set(0, 0, 6);
  camera = camTopo;
}
function initCameraFrontal() {
  camFrontal = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camFrontal.position.set(0, -5, 3);
  camFrontal.up = new THREE.Vector3(0, 0, 1);
  camFrontal.lookAt(0, 0, 0);
  camera = camFrontal;
}
function initCameraLateral() {
  camLateral = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camLateral.position.set(6, 0, 1);
  camLateral.up = new THREE.Vector3(0, 0, 1);
  camLateral.lookAt(0, 0, 0);
  camera = camLateral;
}

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x062640, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  createScene();
  render();

  //Camera's position handle
  window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 49: //1
        initCameraTopo();
        break;
      case 50: //2
        initCameraLateral();
        break;
      case 51: //3
        initCameraFrontal();
        break;
    }
  });
}

function cenario() {
  var planoGeo = new THREE.PlaneGeometry(15, 60);
  var planoMat = new THREE.MeshBasicMaterial({
    color: 0x7cbac2,
    side: THREE.DoubleSide,
  });
  var plano = new THREE.Mesh(planoGeo, planoMat);
  plano.position.set(0, 0, -1);

  var plano1Geo = new THREE.PlaneGeometry(5, 60);
  var plano1Mat = new THREE.MeshBasicMaterial({
    color: 0x02d595e,
    side: THREE.DoubleSide,
  });
  var plano1 = new THREE.Mesh(plano1Geo, plano1Mat);
  plano1.position.set(10, 0, -1);

  var plano2Geo = new THREE.PlaneGeometry(5, 60);
  var plano2Mat = new THREE.MeshBasicMaterial({
    color: 0x02d595e,
    side: THREE.DoubleSide,
  });
  var plano2 = new THREE.Mesh(plano2Geo, plano2Mat);
  plano2.position.set(-10, 0, -1);

  var wallGeo = new THREE.PlaneGeometry(8, 60);
  var wallMat = new THREE.MeshBasicMaterial({
    color: 0x2c7282,
    side: THREE.DoubleSide,
  });
  var wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.set(-10, 0, 0);
  wall.rotation.y = Math.PI / 2;

  var wall2Geo = new THREE.PlaneGeometry(8, 60);
  var wall2Mat = new THREE.MeshBasicMaterial({
    color: 0x2c7282,
    side: THREE.DoubleSide,
  });
  var wall2 = new THREE.Mesh(wall2Geo, wall2Mat);
  wall2.position.set(10, 0, 0);
  wall2.rotation.y = Math.PI / 2;

  scene.add(plano);
  scene.add(plano1);
  scene.add(plano2);
  scene.add(wall);
  scene.add(wall2);
}

function heroShip() {
  //NAVE DO HERÓI
  var pyramidgeoHero = new THREE.CylinderGeometry(0, 1, 1, 4, false);
  var pyramidmatHero = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x0000cd,
  });
  var pyramidHero = new THREE.Mesh(pyramidgeoHero, pyramidmatHero);
  pyramidHero.position.set(0, -2, 0);
  pyramidHero.rotation.y = Math.PI / 4;

  scene.add(pyramidHero);

  var pyramidgeoHero1 = new THREE.CylinderGeometry(0, 1, 2, 4, false);
  var pyramidHero1 = new THREE.Mesh(pyramidgeoHero1, pyramidmatHero);
  pyramidHero1.position.set(0, -2, 0);
  pyramidHero1.rotation.y = Math.PI / 4;
  scene.add(pyramidHero1);

  window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 52:
        pyramidmatHero.wireframe = !pyramidmatHero.wireframe;
        pyramidmatVillain.wireframe = !pyramidmatVillain.wireframe;
        break;
      case 39:
        if (pyramidHero.position.x < 4) {
          pyramidHero.position.x += 0.2;
          pyramidHero1.position.x += 0.2;
          //camera.position.x += 0.2;
        }
        break;
      case 37:
        if (pyramidHero.position.x > -4) {
          pyramidHero.position.x -= 0.2;
          pyramidHero1.position.x -= 0.2;
          //camera.position.x -= 0.2;
        }
        break;
    }
  });
}

function villainShip() {
  //NAVE DO VILÃO
  var pyramidgeoVillain = new THREE.CylinderGeometry(0, 1, 2, 4, false);
  pyramidmatVillain = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xff0000,
  });
  var pyramidVillain = new THREE.Mesh(pyramidgeoVillain, pyramidmatVillain);
  pyramidVillain.position.set(0, 3, 0);
  pyramidVillain.rotation.y = Math.PI / 4;
  pyramidVillain.rotation.x = 179;
  scene.add(pyramidVillain);

  window.setInterval(() => {
    if (pyramidVillain.position.x >= 4) {
      pyramidVillain.position.x -= 0.2;
    } else if (pyramidVillain.position.x <= -4) {
      pyramidVillain.position.x += 0.2;
    } else {
      pyramidVillain.position.x += Math.random() * (max - min) + min;
    }
  }, 300);
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

init();