import React, {useLayoutEffect, useRef, useState} from 'react'
import { useGLTF,useScroll,Scroll, Environment } from '@react-three/drei'
import gsap from "gsap"
import { useFrame } from '@react-three/fiber';



const CoffeeModel = ()=>{
    const img = useGLTF("./creamed_coffee.glb");
    const modelRef = useRef();
    const scroll = useScroll();
    const tl = useRef();


    useFrame((_state,delta)=>{
        tl.current.seek(scroll.offset * tl.current.duration());
        console.log(scroll.offset * tl.current.duration())
    })


    useLayoutEffect(()=>{
        tl.current = gsap.timeline();

        tl.current.to(modelRef.current.position,{x:-2},1)
        tl.current.to(modelRef.current.rotation,{y:-2},1)
        
        tl.current.to(modelRef.current.rotation,{y:0},2)
        tl.current.to(modelRef.current.position,{x:2},2)
        tl.current.to(modelRef.current.rotation,{x:2},2)
        tl.current.to(modelRef.current.position,{z:-3},2)

        tl.current.to(modelRef.current.rotation,{x:0},3)
        tl.current.to(modelRef.current.position,{x:-2},3)
        tl.current.to(modelRef.current.rotation,{z:-2},3)
        tl.current.to(modelRef.current.rotation,{z:0},4)
        tl.current.to(modelRef.current.position,{x:2},4)
        tl.current.to(modelRef.current.position,{z:2},4)

    })



    return (
        <group ref={modelRef}>
            <primitive scale={20} object={img.scene}/>
        </group>
    )
}

const Section = ({children,className})=>{



    return (
        <div className = {`section ${className}`}>
            {children}
        </div>
    )
}


const Overlays = ()=>{

    const [opacityOne,setOpacityOne] = useState(0)
    const [opacityTwo,setOpacityTwo] = useState(0)
    const [opacityThree,setOpacityThree] = useState(0)
    const [opacityFour,setOpacityFour] = useState(0)
    const scroll = useScroll();


    useFrame(()=>{
            setOpacityOne(scroll.range(0/5,1/4))
            setOpacityTwo(scroll.range(1/5,1/4))
            setOpacityThree(scroll.range(2/5,1/4))
            setOpacityFour(scroll.range(3/5,1/4))
    })


    return (
        <Scroll html>
<Section className="start">
    <div style={{opacity:opacityOne}} className="section-card">
        <h1>Check this out</h1>
        <p>Fancy scroll timeline effects that brings users experience more to life!</p>
        <button>Learn More</button>
    </div>
</Section>
<Section className="end">
    <div style={{opacity:opacityTwo}} className="section-card">
        <h1>3d brought to life</h1>
        <p>Through the power of WebGL and the canvas element, let THREE.JS help you bring your vision to life!</p>
        <button>Learn More</button>
    </div>
</Section>
<Section className="start">
    <div style={{opacity:opacityThree}} className="section-card">
        <h1>Mmm mmmm good</h1>
        <p>Users wont be able to resist how the experience brings them in</p>
        <button>Learn More</button>
    </div>
</Section>
<Section className="end">
    <div style={{opacity:opacityFour}} className="section-card">
        <h1>Wow that was fun</h1>
        <p>All of this power with just a few easy lines of code!</p>
        <button>Learn More</button>
    </div>
</Section>
        </Scroll>
    )
}

const ScrollExperience = () => {
  return (
    <>
    <Environment preset="city" background={true}/>
    <CoffeeModel/>
    <Overlays/>
    </>
  )
}

export default ScrollExperience