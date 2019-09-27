export default {
  items: [
    {
      name: 'user',
      url: '/users',
      icon: 'icon-drop'
    },
     {
      name: 'Account Management',
      url: '/account',
      icon: 'cui-people',
      children: [
        {
          name: 'Account',
          url: '/account',
          icon: 'cui-user',
        },
        {
          name: 'Role',
          url: '/roles',
          icon: 'cui-lock-locked',
        }
      ]
    }
  ]
}
