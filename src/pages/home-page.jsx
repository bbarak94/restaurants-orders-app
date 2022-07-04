import React from 'react'
import { useTranslation } from 'react-i18next';
import img1 from '../assets/img/img1.jpg'
import img2 from '../assets/img/img2.jpg'
import img3 from '../assets/img/img3.jpg'
export function HomePage() {
      const { t, i18n } = useTranslation();
      return (
            <div className='home-page flex column'>
                  <section className='flex home-section align-center'>
                        <h1 className='title1'>{t('Don\'t let your orders get cold')}...</h1>
                        <div className='background-container'>
                              <img src={img1} />
                        </div>
                  </section>
                  <section className='flex home-section align-center'>
                        <div className='background-container'>
                              <img src={img2} />
                        </div>
                        <h1 className='title2'>{t('You\'re clients deserves the best')}.</h1>
                  </section>
                  <section className='flex home-section align-center'>
                        <h1 className='title3'>{t('Call no to improve your service')}!</h1>
                        <div className='background-container'>
                              <img src={img3} />
                        </div>
                  </section>
            </div>
      )

}
