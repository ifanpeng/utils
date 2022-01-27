module.exports = {
    title: 'Hello VuePress',
    description: '测试一下是',
    themeConfig: {
        logo: '/images/logo.jpg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '' },
            { 
                text: 'other', 
                // ariaLabel: 'Language Menu',
                items:[
                    { 
                        text: 'zh',
                        link: ''
                    },
                    { 
                        text: 'en',
                        link: ''
                    },
                ]
            },
          ],
        sidebar: [
            'src/common/introduce',
            {
                title: '使用',
                collapsable: false,
                children: [
                    'src/utils/object.md',
                    'src/utils/cookie.md',
                ]
            }
        ]
      },
}