'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextSection() {
  const words = [
    '5 to 6 hours.', 'That\'s', 'the', 'average', 'time', 'you\'ll', 'spend', 'on', 'your', 
    'phone', 'today', '—', 'often', 'without', 'realizing.', 'It\'s', 'time', 'to', 'fight', 'back.'
  ]
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const section = sectionRef.current
    const text = textRef.current

    gsap.set(text.children, { opacity: 0.3, y: 10 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',  // Adjusted to allow full scroll for animation completion
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    })

    words.forEach((_, index) => {
      tl.to(text.children[index], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [words.length])

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center bg-gradient-to-b">
      <h3 
        ref={textRef}
        className="text-center text-xl sm:text-2xl lg:text-4xl font-semibold max-w-4xl px-4 text-white"
      >
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block mx-1 transition-all duration-300"
          >
            {word}
          </span>
        ))}
      </h3>
    </div>
  )
}
