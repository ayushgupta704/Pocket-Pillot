
"use client";



import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
// import { useRef } from 'react';

const HeroSection=() =>{

    const imageRef=useRef()
    
    useEffect(()=>{
        const imageElement=imageRef.current;

        const handleScroll=()=>{
            const scrollPosition=window.scrollY;
            const scrollThreshold=100;

            if(scrollPosition>scrollThreshold){
                imageElement.classList.add("scrolled");
            }
            else{
                imageElement.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll",handleScroll);

        return ()=>window.removeEventListener("scroll",handleScroll);
    },[]);

  return (
  <section className='pt-40 pb-20 px-4'>
  <div className='container mx-auto text-center'>
    <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title'>
        Manage your finances <br/> with Intelligence
    </h1>
    <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
        An AI-powered financial management plateform that helps you track 
     analyse with real time tracking.
    </p>

    <div className='flex justify-center space-x-4'>
        <Link href="/dashboard">
        <Button size="lg" className="px-8">
            Get Started
        </Button>
        </Link>

        <Link href="https://ayushgupta704.github.io/Ayush_portfolio_website/">
        <Button size="lg" variant="outline" className="px-8">
            Watch demo
        </Button>
        </Link>


    </div>
    <div className='hero-image-wrapper'>
        {/* scroll event in image */}
        <div ref={imageRef} className='hero-image'>
            <Image 
            src="/banner.jpeg"
            width={1280}
            height={730}
            alt="Dashboard Preview"
            className="rounded-lg shadow-2xl border mx-auto"
            priority
            />
        </div>
    </div>

  </div>
  </section>
  );
};

export default HeroSection;
