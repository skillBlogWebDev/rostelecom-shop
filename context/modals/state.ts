'use client'
import {
  modals,
  openMenu,
  closeMenu,
  openCatalogMenu,
  closeCatalogMenu,
  openSearchModal,
  closeSearchModal,
  showQuickViewModal,
  closeQuickViewModal,
  closeSizeTable,
  showSizeTable,
  closeShareModal,
  openShareModal,
} from '.'

export const $menuIsOpen = modals
  .createStore(false)
  .on(openMenu, () => true)
  .on(closeMenu, () => false)

export const $catalogMenuIsOpen = modals
  .createStore(false)
  .on(openCatalogMenu, () => true)
  .on(closeCatalogMenu, () => false)

export const $searchModal = modals
  .createStore(false)
  .on(openSearchModal, () => true)
  .on(closeSearchModal, () => false)

export const $showQuickViewModal = modals
  .createStore(false)
  .on(showQuickViewModal, () => true)
  .on(closeQuickViewModal, () => false)

export const $showSizeTable = modals
  .createStore(false)
  .on(closeSizeTable, () => false)
  .on(showSizeTable, () => true)

export const $shareModal = modals
  .createStore(false)
  .on(openShareModal, () => true)
  .on(closeShareModal, () => false)
