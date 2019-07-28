const Mock = require('mockjs');
// const Random = Mock.Random;
// const data = [
//     {
//         "id": "4",
//         "jobtitle": "php",
//         "project_id": "1",
//         "province": "0",
//         "city": "0",
//         "education_type": "1",
//         "number": "10",
//         "responsibilities": "所发生的",
//         "requirements": "地方",
//         "perks": "水电费费是",
//         "img": "aaa",
//         "created_at": "2019-06-11 14:56:44",
//         "isdelete": "0"
//     }
// ]
let page = -1;

function mockData() {
    page += 1;
    const d = Mock.mock({
        "data|10": [
            {
                // 属性 id 是一个自增数，起始值为 0，每次增 1
                'id|+1': page * 10,
                'jobTitle|1': [
                    "小学语文老师",
                    "助理",
                    "程序员"
                ],
                "city": '@city(true)',
                "createdTime": '@date',
                'jobType|1': [
                    "全职",
                    "兼职",
                ],
                'educationType|1': [
                    "硕士",
                    "本科",
                    "专科",
                    "高中",
                ],
                "number|1-100": 100
            },
        ],
        page: page + 1,
        pageCount: (page + 1) * 10
    })
    return d;
}

module.exports = {
    mockData
}