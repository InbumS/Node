const axios = require('axios');

async function get20TopMovies() {
    const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
    try {
        const result = await axios.get(url);
        const { data } = result;
        if (!data.articleList || data.articleList.length === 0) {
            throw new Error("데이터가 없습니다.");
        }

        const movieINFOs = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1 };
        });

        for (let movieInfo of movieINFOs) {
            console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
        }
    } catch (err) {
        throw new Error(err);
    }
}

// Call the function
get20TopMovies();