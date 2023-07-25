const loadsh = require("loadsh");
const PAGE_LIST_SIZE =10;

//page = 현재 페이지
module.exports = ({totalCount, page, perPage = 10})=>{
    const PER_PAGE = perPage;
    const totalpage = Math.ceil(totalCount/PER_PAGE);

    // 10으로 나눈 몫 (0:9 => 1 10: 19 =>2)
    let quotient = parseInt(page/PAGE_LIST_SIZE);
    // 페이지에 아무것도 없다는 뜻이므로 줄인다
    if (page % PAGE_LIST_SIZE === 0){
        quotient -=1;
    }
    //10페이지가 넘었을시 11, 21, 31 이런식으로 출력하기 위해 사용
    const startPage = quotient * PAGE_LIST_SIZE+ 1;
    // 끝페이지 (삭제를 통해 페이지가 삭제가 되었는지 삼중 연산자를 통해 구한다)
    const endPage = startPage + PAGE_LIST_SIZE-1 < totalpage ? startPage + PAGE_LIST_SIZE-1: totalpage;
    const isFirstPage = page===1;
    const isLastPage = page ===totalpage;
    const hasPrev = page>1;
    const hasNext = page<totalpage;
    // 객체 생성
    const paginator = {
        pageList: loadsh.range(startPage, endPage+1),
        page,
        prevPage : page-1,
        nextPage : page+1,
        startPage,
        lastPage: totalpage,
        hasPrev,
        hasNext,
        isFirstPage,
        isLastPage,
    };
    return paginator; 
}