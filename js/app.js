var scene, camera, renderer, pyramidmatVillain;
var min = -1;
var max = 1;

function createScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 6);

  heroShip();
  villainShip();
}

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  createScene();
  render();
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
        pyramidHero.position.x += 0.2;
        pyramidHero1.position.x += 0.2;
        break;
      case 37:
        pyramidHero.position.x -= 0.2;
        pyramidHero1.position.x -= 0.2;
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
  pyramidVillain.rotation.x = 180;
  scene.add(pyramidVillain);

  window.setInterval(() => {
    pyramidVillain.position.x += Math.random() * (max - min) + min;
  }, 300);
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
init();
