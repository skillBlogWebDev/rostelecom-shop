import { IAccordionProps } from '@/types/modules'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

const Accordion = ({
  children,
  title,
  titleClass,
  rotateIconClass,
}: IAccordionProps) => {
  const [expanded, setExpanded] = useState(false)

  const toggleAccordion = () => setExpanded(!expanded)

  return (
    <>
      <motion.button
        initial={false}
        onClick={toggleAccordion}
        className={`btn-reset ${titleClass} ${
          rotateIconClass ? (expanded ? rotateIconClass : '') : ''
        }`}
      >
        {title}
      </motion.button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Accordion
