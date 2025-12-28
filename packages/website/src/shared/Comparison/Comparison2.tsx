'use client'
import style from './Comparison2.module.css'
import {m} from '@/i18n'
import {SectionTitle} from '@/shared/SectionTitle/SectionTitle'
import {Animate, AnimateList} from '@infoportal/client-core'
import clsx from 'clsx'
import ArrowRight from '@mui/icons-material/ArrowForward'

export const Comparison2 = () => {
  return (
    <section className={style.root}>
      <SectionTitle>{m.comparisonTitle}</SectionTitle>
      <div className={style.container}>
        {Object.entries(m.comparison2).map(([key, value]) => (
          <ItemTable item={value} key={key} />
        ))}
      </div>
    </section>
  )
}

const ItemTable = ({item}: {item: {icon: any; title: string; problem: string; solution: string}}) => {
  return (
    <article className={clsx(style.item, style.animate)}>
      <div className={style.item_logo}>
        <item.icon className={style.item_logo_icon} />
      </div>
      <div className={style.item_body}>
        <div style={{flex: 1}}>
          <h4 className={style.item_title}>{item.title}</h4>
          <div className={style.item_problem}>{item.problem}</div>
        </div>
        <ArrowRight fontSize="large"/>
        <div style={{flex: 1}} className={clsx(style.animateLeft, style.item_solution)}>
          <h4 className={style.item_title}>With NexusPortal</h4>
          <div className={style.item_solution_details}>{item.solution}</div>
        </div>
      </div>
    </article>
  )
}
