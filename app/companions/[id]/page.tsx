import { getCompanion } from '@/actions/companion.action';
import CompanionComponent from '@/components/CompanionComponent';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

interface CompanionSessionPageProp {
  params: Promise<{ id: string }>
}

//params /url/{id} -> id we will be getting id cos of the dynamic route directlyin params
//searchParams /url?key=value
const CompanionSession = async ({ params }: CompanionSessionPageProp) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser()

  if (!user){
    redirect('/sign-in')
  }
  if (!companion){
    redirect('/companion')
  }

  return (
    <main>
      <article className='flex rounded-border p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          
          {/* for large device view port */}
          <div className='max-md:hidden size-[72px] flex 
          items-center justify-center rounded-lg' 
          style={{backgroundColor:getSubjectColor(companion.subject)}}>

            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35}/>
          </div>

          {/* for small and medium device */}
          <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <p className='font-bold text-2xl'>
                  {companion.name}
                </p>
                <div className='subject-badge max-sm:hidden'>
                    {companion.subject}
                </div>
              </div>
              <p className='text-lg'>
                  {companion.topic}    
              </p>
          </div>
        </div>

        <div className='items-start text-2xl max-md:hidden'>
          {companion.duration} minutes
        </div>
        <div className='block md:hidden'>
          {companion.duration} mins
        </div>
      </article>
      <CompanionComponent companion={companion!}
      companionId = {id}
      userName={user.firstName!}
      userImage={user.imageUrl!}
      />
    </main>
  )
}

export default CompanionSession