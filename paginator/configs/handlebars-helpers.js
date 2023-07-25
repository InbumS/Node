// 커스텀 헬퍼 만들기
module.exports ={

    lengthofList: (list = []) => list.length,
    eq: (val1, val2) => val1 === val2,
    // Date function to make string type
    dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};

/*
    사용 예시
    {{lengthOfList comments}}개의 댓글이 있습니다.
    작성일시: {{dateString createdDt}}
    {{#if (eq.@root.paginator.page)}}eq테스트{{/if}}
    
    . -> 현재 객체
    @root -> 최상위 객체
*/
