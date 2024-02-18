import { useUnit } from 'effector-react'
import { $showQuickViewModal, $showSizeTable } from '@/context/modals'
import { closeAuthPopupWhenSomeModalOpened } from '@/lib/utils/common'

const AuthPopupClose = () => {
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)

  const closePopup = () =>
    closeAuthPopupWhenSomeModalOpened(showQuickViewModal, showSizeTable)

  return <button className='btn-reset auth-popup__close' onClick={closePopup} />
}

export default AuthPopupClose
