"use client";
import React, { useEffect, useState } from 'react'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue }  from './ui/select'
import { subjects } from '@/constants'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const SubjectFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('subject') || ''
  const [subject, setSubject] = useState(query);
  useEffect(() => {
    let newUrl = "";

    if (subject == "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove:["subject"]
      })
    } else{
      newUrl = formUrlQuery({
        params:searchParams.toString(),
        key:"subject",
        value:subject
      })
    }
    router.push(newUrl,{scroll:false})

  }, [subject])


  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className='input capitalize'>
        <SelectValue placeholder="Subject" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value='all'>
          All SUbjects
        </SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className='capitalize'>
            {subject}
          </SelectItem>

        ))}
      </SelectContent>
    </Select>
  )
}

export default SubjectFilter