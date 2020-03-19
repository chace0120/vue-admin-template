import Mock from 'mockjs'

const data = Mock.mock({
  'items|15': [{
    id: '@id',
    name: '@title(2, 3)',
    desc: '@sentence(5, 10)',
    hotelTimezone: 'US/NEW_YORK',
    'startDay|1-7': 1,
    'status|1': [0, 1],
    abbrName: '@word(3)',
    'isHotel|1': [0, 1]
  }]
})

export default [
  {
    url: '/vue-admin-template/companies',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
