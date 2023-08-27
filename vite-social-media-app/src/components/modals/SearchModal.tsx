import React from 'react'
import useSearchModal from '../../hooks/useSearchModal'
import Box from '../ui/Box'
import Search from '../../pages/auth/Search'

export default function SearchModal() {
    const searchModal = useSearchModal()

    if(!searchModal.isOpen) return null

  return (
    <Box
        onClick={searchModal.Close}
    >
        <Search action={'message'}/>
    </Box>
  )
}
