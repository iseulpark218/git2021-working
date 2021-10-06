const data = [
    /*
{
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "검역",
        "defCnt": 6128,
        "incDec": 8,
        "isolIngCnt": 196,
        "isolClearCnt": 5917,
        "deathCnt": 15,
        "overFlowCnt": 8,
        "localOccCnt": 0
    },
    */
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "제주",
        "defCnt": 2909,
        "incDec": 5,
        "isolIngCnt": 82,
        "isolClearCnt": 2825,
        "deathCnt": 2,
        "overFlowCnt": 0,
        "localOccCnt": 5
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "경남",
        "defCnt": 11819,
        "incDec": 70,
        "isolIngCnt": 830,
        "isolClearCnt": 10952,
        "deathCnt": 37,
        "overFlowCnt": 0,
        "localOccCnt": 70
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "경북",
        "defCnt": 8653,
        "incDec": 57,
        "isolIngCnt": 763,
        "isolClearCnt": 7799,
        "deathCnt": 91,
        "overFlowCnt": 0,
        "localOccCnt": 57
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "전남",
        "defCnt": 3186,
        "incDec": 13,
        "isolIngCnt": 249,
        "isolClearCnt": 2916,
        "deathCnt": 21,
        "overFlowCnt": 0,
        "localOccCnt": 13
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "전북",
        "defCnt": 4643,
        "incDec": 23,
        "isolIngCnt": 372,
        "isolClearCnt": 4210,
        "deathCnt": 61,
        "overFlowCnt": 0,
        "localOccCnt": 23
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "충남",
        "defCnt": 9364,
        "incDec": 34,
        "isolIngCnt": 1057,
        "isolClearCnt": 8249,
        "deathCnt": 58,
        "overFlowCnt": 1,
        "localOccCnt": 33
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "충북",
        "defCnt": 6576,
        "incDec": 44,
        "isolIngCnt": 586,
        "isolClearCnt": 5912,
        "deathCnt": 78,
        "overFlowCnt": 0,
        "localOccCnt": 44
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "강원",
        "defCnt": 6633,
        "incDec": 24,
        "isolIngCnt": 404,
        "isolClearCnt": 6166,
        "deathCnt": 63,
        "overFlowCnt": 0,
        "localOccCnt": 24
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "경기",
        "defCnt": 93422,
        "incDec": 497,
        "isolIngCnt": 10947,
        "isolClearCnt": 81660,
        "deathCnt": 815,
        "overFlowCnt": 1,
        "localOccCnt": 496
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "세종",
        "defCnt": 1278,
        "incDec": 10,
        "isolIngCnt": 86,
        "isolClearCnt": 1191,
        "deathCnt": 1,
        "overFlowCnt": 0,
        "localOccCnt": 10
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "울산",
        "defCnt": 5243,
        "incDec": 12,
        "isolIngCnt": 207,
        "isolClearCnt": 4981,
        "deathCnt": 55,
        "overFlowCnt": 1,
        "localOccCnt": 11
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "대전",
        "defCnt": 7176,
        "incDec": 39,
        "isolIngCnt": 552,
        "isolClearCnt": 6575,
        "deathCnt": 49,
        "overFlowCnt": 0,
        "localOccCnt": 39
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "광주",
        "defCnt": 5092,
        "incDec": 15,
        "isolIngCnt": 271,
        "isolClearCnt": 4792,
        "deathCnt": 29,
        "overFlowCnt": 1,
        "localOccCnt": 14
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "인천",
        "defCnt": 16431,
        "incDec": 106,
        "isolIngCnt": 1719,
        "isolClearCnt": 14622,
        "deathCnt": 90,
        "overFlowCnt": 1,
        "localOccCnt": 105
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "대구",
        "defCnt": 15840,
        "incDec": 50,
        "isolIngCnt": 1017,
        "isolClearCnt": 14581,
        "deathCnt": 242,
        "overFlowCnt": 1,
        "localOccCnt": 49
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "부산",
        "defCnt": 12926,
        "incDec": 47,
        "isolIngCnt": 507,
        "isolClearCnt": 12264,
        "deathCnt": 155,
        "overFlowCnt": 1,
        "localOccCnt": 46
    },
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "서울",
        "defCnt": 104033,
        "incDec": 521,
        "isolIngCnt": 14786,
        "isolClearCnt": 88585,
        "deathCnt": 662,
        "overFlowCnt": 3,
        "localOccCnt": 518
    },
    /*
    {
        "stdDay": "2021년 10월 05일 00시",
        "gubun": "합계",
        "defCnt": 321352,
        "incDec": 1575,
        "isolIngCnt": 34631,
        "isolClearCnt": 284197,
        "deathCnt": 2524,
        "overFlowCnt": 18,
        "localOccCnt": 1557
    },
    */
];

export default data;
