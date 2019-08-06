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

const provinceLite = {
    "广东": "粤",
    "北京": "京",
    "福建": "闽",
    "浙江": "浙",
    "上海": "沪",
    "湖北": "鄂",
    "湖南": "湘",
    "江西": "赣",
    "海南": "琼",
    "天津": "津",
    "重庆": "渝",
    "河北": "冀",
    "河南": "豫",
    "安徽": "皖",
    "广西": "桂",
    "四川": "川",
    "贵州": "黔",
    "山西": "晋",
    "辽宁": "辽",
    "吉林": "吉",
    "黑龙江": "黑",
    "江苏": "苏",
    "山东": "鲁",
    "云南": "云",
    "陕西": "陕",
    "甘肃": "甘",
    "青海": "青",
    "台湾": "台",
    "内蒙古": "蒙",
    "宁夏": "宁",
    "新疆": "新",
    "西藏": "藏",
    "香港": "港",
    "澳门": "澳",
}

module.exports = {
    mockData,
    provinceLite
}