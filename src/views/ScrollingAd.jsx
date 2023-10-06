import React from 'react'
import { Canvas } from '@react-three/fiber'
import {ScrollControls} from "@react-three/drei"
import ScrollExperience from "./ScrollExperience"

const ScrollingAd = () => {
  return (
    <div className="view-container">
    <Canvas>
        <color attach="background" args={["black"]}/>
        <ScrollControls pages={5} damping={.3}>
        <ScrollExperience/>
      </ScrollControls>
      </Canvas>
    </div>
  )
}

export default ScrollingAd