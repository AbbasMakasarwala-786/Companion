"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchInput = () => {
  const pathname = usePathname()
  const router = useRouter() // for naviagatio form next navigation
  const searchParams = useSearchParams()
  const query = searchParams.get('topic') || '' // in client you need to get using this server components can accept it as props
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {

    // set a delaydebouncefunction for we dont want to make the query for the db for each thing type so we add a delay
    const delaydebouncefunction = setTimeout(() => {

      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery
        })

        router.push(newUrl, { scroll: false })
      }
      else {
        if (pathname == '/companions') {
          const newurl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          })
          router.push(newurl, { scroll: false })
        }
      }

    },500)} //delay for 500ms
    , [searchQuery, router, query])



  return (
    <div className='relative border-2 border-black flex rounded-lg items-center gap-2 px-2 py-1 h-fit'>
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />

      <input placeholder='Search Companion&#39;s'
        className='outline-none'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} //e.target.value is the text the user typed & setSearchQuery(...) updates the state
      />
    </div>
  )

}

export default SearchInput