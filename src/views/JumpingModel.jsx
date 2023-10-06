import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const JumpingModel = () => {
  const boxGuy = useGLTF("./brokenboxguy.glb")
  return (
    <div className="view-container">
      <Canvas>
        <OrbitControls/>
        <spotLight intensity={10} position={[0,2,2]}/>
        <group scale={.6}>
          <primitive object={boxGuy.scene}/>
        </group>
      </Canvas>
    </div>
  )
}

export default JumpingModel