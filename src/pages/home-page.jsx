import React from 'react'
import { useTranslation } from 'react-i18next';
import img1 from '../assets/img/img1.jpg'
import img2 from '../assets/img/img2.jpg'
import img3 from '../assets/img/img3.jpg'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export function HomePage() {
      const { t, i18n } = useTranslation();
      if(document.body.dir==='ltr'){
            var totalSales=(25534).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
         }else{
            var totalSales=(25534).toLocaleString('il-HE', { style: 'currency', currency: 'ILS' })
         }
      return (
            <div className='home-page flex column'>
                  <h1 className='title'>Home Page</h1>
                  <div className='insights'>
                        <div className='card'>
                              <div className='icon-container flex align-center justify-center' style={{ width: '50px', height: '50px' }}>
                                    <AttachMoneyIcon style={{ width: '25px', height: '25px' }} />
                              </div>
                              <div className='middle'>
                                    <div className='left'>
                                          <h3>Total Sales</h3>
                                          <h1>{totalSales}</h1>
                                    </div>
                                    <div className='progress sales-progress'>
                                          <svg>
                                                <circle cx='38' cy='38' r='36'> </circle>
                                          </svg>
                                          <div className='number'>
                                                81%
                                          </div>
                                    </div>
                              </div>
                              <h4>Last 24 Hours</h4>
                        </div>
                        <div className='card'>
                              <div className='icon-container flex align-center justify-center orders'>
                                    <ReceiptLongIcon style={{ width: '25px', height: '25px' }} />
                              </div>
                              <div className='middle'>
                                    <div className='left'>
                                          <h3>Total Orders</h3>
                                          <h1>984</h1>
                                    </div>
                                    <div className='progress orders-progress'>
                                          <svg>
                                                <circle cx='38' cy='38' r='36'> </circle>
                                          </svg>
                                          <div className='number'>72%</div>

                                    </div>
                              </div>
                              <h4>Last 24 Hours</h4>
                        </div>
                        <div className='card'>
                              <div className='icon-container flex align-center justify-center restaurants'>
                                    <RestaurantIcon style={{ width: '25px', height: '25px' }} />
                              </div>
                              <div className='middle'>
                                    <div className='left'>
                                          <h3>Total Clients</h3>
                                          <h1>65</h1>
                                    </div>
                                    <div className='progress restaurants-progress'>
                                          <svg>
                                                <circle cx='38' cy='38' r='36'></circle>
                                          </svg>
                                          <div className='number'>78%</div>
                                    </div>
                              </div>
                              <h4>Last 24 Hours</h4>
                        </div >


                  </div >
                  {/* <section className='flex home-section align-center'>
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
                  </section> */}
            </div >
      )

}
