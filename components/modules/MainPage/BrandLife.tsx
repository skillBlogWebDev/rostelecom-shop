import Image from 'next/image'
import Link from 'next/link'
import AllLink from '@/components/elements/AllLink/AllLink'
import useImagePreloader from '@/hooks/useImagePreloader'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import img1 from '@/public/img/brands-life.png'
import img2 from '@/public/img/categories-img-1.png'
import MainSlider from './MainSlider'
import styles from '@/styles/main-page/index.module.scss'

const BrandLife = () => {
  const isMedia490 = useMediaQuery(490)
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const { lang, translations } = useLang()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

  const textWithNonBreakingSpace = (text: string) =>
    text.replace(/\s/g, '\u00A0')

  const images = [
    { src: img1, id: 1, title: translations[lang].main_page.brand_nature },
    { src: img2, id: 1, title: translations[lang].main_page.brand_look },
    { src: img2, id: 1, title: translations[lang].main_page.brand_idea },
  ]

  return (
    <section className={styles.brands}>
      <div className={`container ${styles.brands__container}`}>
        <h2 className={`site-title ${styles.brands__title}`}>
          {translations[lang].main_page.brand_title}
        </h2>
        <div className={styles.brands__inner}>
          <AllLink />
        </div>
        {!isMedia490 && (
          <ul className={`list-reset ${styles.brands__list}`}>
            <li className={styles.brands__list__item}>
              <Link
                href='/'
                className={`${styles.brands__list__item__link} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={img1}
                  alt={translations[lang].main_page.brand_nature}
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                />
                <span>
                  {textWithNonBreakingSpace(
                    translations[lang].main_page.brand_nature
                  )}
                </span>
              </Link>
            </li>
            <li className={styles.brands__list__item}>
              <Link
                href='/'
                className={`${styles.brands__list__item__link} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={img2}
                  alt={translations[lang].main_page.brand_look}
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                />
                <span>
                  {textWithNonBreakingSpace(
                    translations[lang].main_page.brand_look
                  )}
                </span>
              </Link>
            </li>
            <li className={styles.brands__list__item}>
              <Link
                href='/'
                className={`${styles.brands__list__item__link} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={img2}
                  alt={translations[lang].main_page.brand_idea}
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                />
                <span>
                  {textWithNonBreakingSpace(
                    translations[lang].main_page.brand_idea
                  )}
                </span>
              </Link>
            </li>
          </ul>
        )}
        {isMedia490 && <MainSlider images={images} />}
      </div>
    </section>
  )
}

export default BrandLife
