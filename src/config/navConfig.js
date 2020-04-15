const navList = [
  {
    title: 'HOME',
    key: '/home', //route
    icon: 'home',
    isPublic: true, //all the user can access home
  },
  {
    title: 'PRODUCTS',
    key: '/products', //unique key
    icon: 'appstore',
    children: [
      {
        title: 'CATEGORY',
        key: '/category', //route
        icon: 'bars'
      },
      {
        title: 'PRODUCT',
        key: '/product', //route
        icon: 'tool'
      },
    ]
  },

  {
    title: 'USER',
    key: '/user', //route
    icon: 'user'
  },
  {
    title: 'ROLE',
    key: '/role', //route
    icon: 'safety',
  },

  {
    title: 'STATISTIC',
    key: '/statistic', //unique key
    icon: 'area-chart',
    children: [
      {
        title: 'BAR CHART',
        key: '/bar', //route
        icon: 'bar-chart'
      },
      {
        title: 'LINE CHART',
        key: '/line', //route
        icon: 'line-chart'
      },
      {
        title: 'PIE CHART',
        key: '/pie', //route
        icon: 'pie-chart'
      },
    ]
  },
];

export default navList;