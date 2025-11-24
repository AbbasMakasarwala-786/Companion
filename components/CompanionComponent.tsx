import { cn, getSubjectColor } from '@/lib/utils'
import React from 'react'

const CompanionComponent = ({
    companionId, subject, topic, name, userName,
    userImage, style, voice,
}: CompanionComponentProps) => {
    return (
        <section className='flex flex-col h-[70vh]'>
            <section className='flex gap-8 max-sm:flex-col'>
                <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
                    <div className={cn('absolute transistion-opacity duration-1000')}></div>
                </div>
            </section>
        </section>
    )
}

export default CompanionComponent