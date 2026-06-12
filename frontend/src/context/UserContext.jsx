import React, { useMemo, useState } from 'react'
import { UserContext } from './UserContextInstance'

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const value = useMemo(() => ({ user, setUser }), [user])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider