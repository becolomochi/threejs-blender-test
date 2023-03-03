import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
  alpha: true,
});

const width = document.querySelector("#canvas").clientWidth;
const height = document.querySelector("#canvas").clientWidth;

renderer.setPixelRatio(1);
renderer.setSize(width, height);
console.log(window.devicePixelRatio);
console.log(width + ", " + height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(0, 400, -1000);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
const url = "3d/notitle.glb";

const w_height = window.innerHeight;

let model = null;
loader.load(
  url,
  function (gltf) {
    model = gltf.scene;
    model.scale.set(100.0, 100.0, 100.0);
    model.position.set(0, (w_height / 3) * -1, 0);
    scene.add(gltf.scene);
  },
  function (error) {
    console.log("An error happened");
    console.log(error);
  }
);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

// 平行光源
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 1; // 光の強さ
light.position.set(3, 10, 1);
// シーンに追加
scene.add(light);

//環境光源(アンビエントライト)：すべてを均等に照らす、影のない、全体を明るくするライト
const ambient = new THREE.AmbientLight(0xf8f8ff, 0.7);
scene.add(ambient); //シーンにアンビエントライトを追加

// 初回実行
tick();

function tick() {
  controls.update();

  if (model != null) {
    console.log(model);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
