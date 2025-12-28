'use client'
import {motion, useScroll, useTransform} from 'framer-motion'
import {useRef} from 'react'
import {OverviewCard} from '@/shared/Overview/OverviewCard'
import {m} from '@/i18n'
import {Obj} from '@axanc/ts-utils'

const steps = Obj.entries(m.overview_)

export default function Scrolly() {
  const ref = useRef<HTMLDivElement>(null)

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: `${steps.length * 120}vh`, // scroll distance
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 120, // 👈 visible before & after
          height: 600, // 👈 bounded height
          overflow: 'hidden',
        }}
      >
        <OverviewStack steps={steps} progress={scrollYProgress} />
      </div>
    </div>
  )
}

function OverviewStack({steps, progress}: any) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
      }}
    >
      {steps.map(([key, step]: any, i: number) => (
        <OverviewStep
          key={key}
          name={key}
          index={i}
          total={steps.length}
          imageSrc={`/ss-${key}.png`}
          progress={progress}
          {...step}
        />
      ))}
    </div>
  )
}

function OverviewStep({index, total, progress, name, title, desc, imageSrc}: any) {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2

  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0])

  const y = useTransform(progress, [start, end], [40, -40])

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        y,
        pointerEvents: 'none', // avoids overlap issues
      }}
    >
      <OverviewCard key={name} title={title} desc={desc} imageSrc={imageSrc} />
    </motion.div>
  )
}
