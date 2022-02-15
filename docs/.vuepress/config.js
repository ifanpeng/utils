module.exports = {
    title: '工具函数库',
    description: '对常用的一些功能进行封装，方便使用',
    head: [
        ['link', { rel: 'icon', href: '/images/favicon.png' }]
    ],
    themeConfig: {
        logo: '/images/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: '接口管理平台', link: 'https://www.bbccdd.cn/' },
            { 
                text: '其他', 
                items:[
                    { 
                        text: '添加QQ好友',
                        link: 'tencent://Message/?Uin=1763535096'
                    }
                ]
            },
          ],
        sidebar: [
            'src/common/introduce',
            {
                title: '使用',
                collapsable: false,
                children: [
                    'src/utils/function.md',
                    'src/utils/object.md',
                    'src/utils/cookie.md',
                    'src/utils/url.md',
                    'src/utils/date.md',
                ]
            }
        ]
      },
}