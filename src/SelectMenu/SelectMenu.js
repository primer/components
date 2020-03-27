import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {COMMON} from '../constants'
import theme from '../theme'
import {wrapperStyles} from './SelectMenuStyles'
import {MenuContext} from './SelectMenuContext'
import SelectMenuDivider from './SelectMenuDivider'
import SelectMenuFilter from './SelectMenuFilter'
import SelectMenuFooter from './SelectMenuFooter'
import SelectMenuItem from './SelectMenuItem'
import SelectMenuList from './SelectMenuList'
import SelectMenuModal from './SelectMenuModal'
import SelectMenuTabs from './SelectMenuTabs'
import SelectMenuTab from './SelectMenuTab'
import SelectMenuTabPanel from './SelectMenuTabPanel'
import useKeyboardNav from './hooks/KeyboardHook'

const SelectMenuBase = ({children, initialTab, theme, ...rest}) => {
  const ref = useRef(null)
  const [selectedTab, setSelectedTab] = useState(initialTab)
  const [open, setOpen] = useState(false)
  useKeyboardNav(ref)
  const menuProviderValues = {
    selectedTab,
    setSelectedTab,
    open,
    initialTab
  }

  function toggle(event) {
    setOpen(event.target.open)
  }

  return (
    <MenuContext.Provider value={menuProviderValues}>
      <details ref={ref} {...rest} onToggle={toggle}>
        {children}
      </details>
    </MenuContext.Provider>
  )
}

const SelectMenu = styled(SelectMenuBase)`
  ${wrapperStyles}
  ${COMMON}
`

SelectMenu.MenuContext = MenuContext
SelectMenu.List = SelectMenuList
SelectMenu.Divider = SelectMenuDivider
SelectMenu.Filter = SelectMenuFilter
SelectMenu.Footer = SelectMenuFooter
SelectMenu.Item = SelectMenuItem
SelectMenu.List = SelectMenuList
SelectMenu.Modal = SelectMenuModal
SelectMenu.Tabs = SelectMenuTabs
SelectMenu.Tab = SelectMenuTab
SelectMenu.TabPanel = SelectMenuTabPanel

SelectMenu.defaultProps = {
  theme
}

SelectMenu.propTypes = {
  initialTab: PropTypes.string,
  ...COMMON.propTypes
}

export default SelectMenu