import React, {useMemo,useRef} from 'react'
import { Sphere,ScrollControls,Float,useScroll,Text, OrbitControls,Line,PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { LayerMaterial,Gradient } from 'lamina'
import * as THREE from "three"
import Airplane from '../Airplane'

const STEPS = 300;

const BgSphere = ()=>{

  return (
    <Sphere scale={500}>
<LayerMaterial side={THREE.BackSide}>
  <Gradient colorA="lightblue" colorB="white" axes="y" start={0} end={.5}/>
</LayerMaterial>
    </Sphere>
  )
}

const Plane = ()=>{

  

  return (
    <group>
      <Float>
        <Airplane scale={1} rotation={[0,1.5,0]}/>
      </Float>
    </group>
  )
}


const FlyExperience = ()=>{
  const cameraRef = useRef();
  const scroll = useScroll();
  const planeRef = useRef();

  const linePoints =[
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(0,0,-100),
    new THREE.Vector3(5,-5,-200),
    new THREE.Vector3(0,0,-300),
    new THREE.Vector3(-5,0,-400),
    new THREE.Vector3(0,5,-500),
    new THREE.Vector3(10,-1,-600),
    new THREE.Vector3(0,2,-700),
    new THREE.Vector3(6,0,-800),
    new THREE.Vector3(2,7,-900),
    new THREE.Vector3(0,0,-1000),
  ]

  const line = useMemo(()=>{
    return new THREE.CatmullRomCurve3(linePoints,false,"catmullrom",.5);
  },[linePoints])

  const lPoints = useMemo(()=>{
    return line.getPoints(STEPS);
  },[linePoints])

  console.log(lPoints)

  const shape = useMemo(()=>{
    const shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(0,1);
    return shape;
  },[])

  let prevX;

  useFrame((state,delta)=>{
    var currIdx = Math.min(Math.round(lPoints.length * scroll.offset),lPoints.length-1);

    let currLocation = lPoints[currIdx];

    console.log(currIdx)
    console.log(currLocation)
    if(prevX > currLocation.x){
      planeRef.current.rotation.z -=.01
    }
    if(currLocation.x > prevX){
      planeRef.current.rotation.z +=.01

    }
    prevX = currLocation.x;

    cameraRef.current.position.lerp(currLocation,delta * 25)
  })
  return (
    <>

        <group ref={cameraRef}>
        <PerspectiveCamera makeDefault fov={50} position={[0,2,10]}/>
<group ref={planeRef}>
        <Plane/>
        </group>
        </group>
        <group>
          <mesh position={[0,-2,0]}>
          <extrudeGeometry args={[
            shape,{
              extrudePath:line,
              steps:STEPS
            }
          ]}/>
          </mesh>
        </group>
        {/* <Line position={[0,-3,0]} points={lPoints} lineWidth={20} color="red"/> */}
      
    </>
  )
}

const FlyJourney = () => {

const text=[
  {id:1,title:"Welcome",blurb:"So begins the journey",position:[5,0,-100]},
  {id:2,title:"Flying with 3JS",blurb:"Look at us go",position:[-5,0,-200]},
  {id:3,title:"Leaving the light",blurb:"Things are about get to dark!",position:[5,0,-400]},
  // {id:1,title:"Welcome",blurb:"So begins the journey",position:[2,0,-600]},
  // {id:1,title:"Welcome",blurb:"So begins the journey",position:[2,0,-800]},
]


  return (
    <div className="view-container">
      <Canvas>
        <color attach="background" args={["black"]}/>
        <pointLight/>
        <ambientLight intensity={.2}/>
        {/* <OrbitControls/> */}
        <BgSphere/>

        <ScrollControls pages={5} damping={.2}>
    <FlyExperience/>
        {/* <Line position={[0,-3,0]} points={lPoints} lineWidth={20} color="red"/> */}
        </ScrollControls>
        {text.map(t=>(
          <group position={t.position}>
            <Text color="black">
              {t.title}
            </Text>
            <Text position={[0,-1,0]} fontSize={.5} color="red">
              {t.blurb}
            </Text>
          </group>
        ))}
      </Canvas>
    </div>
  )
}

export default FlyJourney