import React from 'react'
import Search from './Search'
import Filter from './Filter'

const Hero = () => {
    return (
        <div className='flex flex-col gap-6 py-16'>
            <h1 className='text-[#EBEEF5] text-5xl md:text-[64px] font-bold px-4 md:px-16 leading-tight'>
                MaileHereko
            </h1>
            <p className='text-[#A8AEBF]/80 text-base md:text-lg font-light px-4 md:px-16 max-w-3xl'>
                List of movies and TV Shows, I, Pramod Poudel have watched till date.
                <br />Explore what I have watched and also feel free to make a suggestion.
            </p>
            <Search />
            <Filter />
        </div>
    )
}


export default Hero