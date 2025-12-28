import style from './Banner.module.css'
import {m} from '@/i18n'
import {Button} from '@mui/material'
import {Pulse} from '@/shared/Pulse'
import {AppTitle} from '@infoportal/client-core/server'
import ArrowRight from '@mui/icons-material/ArrowForward'

export const Banner = () => {
  return (
    <section className={style.root}>
      <div className={style.imageContainer}>
        {/*<Image*/}
        {/*  src={'/ss1.png'}*/}
        {/*  alt=""*/}
        {/*  width={800}*/}
        {/*  height={600}*/}
        {/*  style={{width: '100%', height: 'auto'}}*/}
        {/*  className={style.image}*/}
        {/*/>*/}
        <div className={style.content}>
          <div>
            <AppTitle sx={{fontSize: '4.5rem'}} />
            <div className={style.desc}>{m.desc}</div>

            <div className={style.keys}>
              <div style={{animationDelay: '.2s'}} className={style.key}>
                {m.key1}
              </div>
              <ArrowRight className={style.arrow} style={{animationDelay: '.4s'}} />
              <div className={style.key} style={{animationDelay: '.6s'}}>
                {m.key2}
              </div>
              <ArrowRight className={style.arrow} style={{animationDelay: '.8s'}} />
              <div className={style.key} style={{animationDelay: '1s'}}>
                {m.key3}
              </div>
            </div>
            <Pulse>
              <Button
                variant="contained"
                size="large"
                // endIcon={<Rocket/>}
              >
                {m.cta}
              </Button>
            </Pulse>
          </div>
        </div>
      </div>
    </section>
  )
}
