import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
   <section className='cta-section md:w-full'>
    <div className='cta-badge'>
      Start learning your way
    </div>
    <h2 className='text-2xl font-bold'>
      Build and Personalize Your Learning Companion
    </h2>
    <p>Pick a name, Subject, Voice, & personality - and start learning through voice converstations that fell natural and fun.</p>
    <Image src="images/cta.svg" alt="cta" height={232} width={362} />
    <button className='btn-primary'>
      <Image src="/icons/plus.svg" alt='plus' width={12} height={12}/>
      <Link href="/companions/new">
      <p>Build a new Companion</p>
      </Link>
    </button>
   </section>
  )
}

export default CTA