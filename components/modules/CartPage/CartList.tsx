import { AnimatePresence, motion } from 'framer-motion'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import { basePropsForMotion } from '@/constants/motion'
import styles from '@/styles/cart-page/index.module.scss'
import CartListItem from './CartListItem'

const CartList = () => {
  const currentCartByAuth = useCartByAuth()

  return (
    <>
      <AnimatePresence>
        {currentCartByAuth.map((item) => (
          <motion.li
            key={item._id || item.clientId}
            {...basePropsForMotion}
            className={styles.cart__list__item}
          >
            <CartListItem item={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </>
  )
}

export default CartList
