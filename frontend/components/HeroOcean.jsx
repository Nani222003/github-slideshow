import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroOcean() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const mountNode = canvasRef.current;
    if (!mountNode) return undefined;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);

    const shipGeometry = new THREE.BoxGeometry(4, 0.3, 1);
    const shipMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xffffff,
    });

    const ship = new THREE.Mesh(shipGeometry, shipMaterial);
    scene.add(ship);
    camera.position.z = 8;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    let animationFrame;
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      ship.position.x += 0.02;

      if (ship.position.x > 10) {
        ship.position.x = -10;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      shipGeometry.dispose();
      shipMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={canvasRef} id="heroCanvas" className="absolute top-0 left-0 w-full h-screen" />;
}
