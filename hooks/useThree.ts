import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface Props {
  id: string;
}

const useThree = ({ id }: Props) => {
  const width = 800;
  const height = 800;

  const scene = new THREE.Scene();
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let cube: THREE.Mesh;
  let controls: OrbitControls;

  const setRenderer = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    const target = document.getElementById(id);
    if (!target) return;
    target.appendChild(renderer.domElement);
  };

  const setCamera = () => {
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
  };

  const makeCube = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: '#00ff80' });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  };

  const setLight = () => {
    const ambientlight = new THREE.AmbientLight('#ffffff', 1);
    scene.add(ambientlight);
    const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
    directionalLight.position.x = 1;
    directionalLight.position.y = 2;
    directionalLight.position.z = 3;

    scene.add(directionalLight);
  };

  const setControl = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 500;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    const speed = 0.005;
    cube.rotation.x += speed;
    cube.rotation.y += speed;
    controls.update();
    renderer.render(scene, camera);
  };

  const renderCube = () => {
    setRenderer();
    setCamera();
    makeCube();
    setLight();
    setControl();
    animate();
  };

  return {
    renderCube,
  };
};

export default useThree;
