import { LogOut, Settings, User } from 'lucide-react'
import FloatingActionMenu from '.'

export const FloatingActionMenuDemo = () => {
  return (
    <FloatingActionMenu
      className="relative"
      options={[
        {
          label: 'Account',
          Icon: <User className="h-4 w-4" />,
          onClick: () => console.log('Account clicked'),
        },
        {
          label: 'Settings',
          Icon: <Settings className="h-4 w-4" />,
          onClick: () => console.log('Settings clicked'),
        },
        {
          label: 'Logout',
          Icon: <LogOut className="h-4 w-4" />,
          onClick: () => console.log('Logout clicked'),
        },
      ]}
    />
  )
}
