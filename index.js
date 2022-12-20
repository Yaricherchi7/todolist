

const state = {
    users: [],
    posts: [],
    data: [],
    _data: [],
    pageInfo: {
        totalItems: 0,
        totalPages: 1,
        currentPage: 2,
        limit: 10,
        hasPrevPage: false,
        hasNextPage: false,
    },
    orderBy: "A-Z"
}

const usersJson = async () => {
    try {
        const result = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await result.json();
        state.users = users;
    } catch (error) {
        console.log(error)
    }
}

const postJson = async () => {
    try {
        const result = await fetch("https://jsonplaceholder.typicode.com/posts")
        const posts = await result.json();
        state.posts = posts
    } catch (error) {
        console.log(error)
    }
}

const formatData = () => {
    state._data = state.posts.map(post => {
        const user = state.users.find((user) => user.id == post.userId);
        return { ...post, author: user.name }
    })
}

const applyPageIndex = () => {
    state.pageInfo.totalItems = state._data.length;
    state.pageInfo.totalPages = Math.floor(state.pageInfo.totalItems / state.pageInfo.limit);
    state.pageInfo.hasPrevPage = state.pageInfo.currentPage > 1;
    state.pageInfo.hasNextPage = state.pageInfo.currentPage < state.pageInfo.totalPages;

    const startIndex = state.pageInfo.limit * (state.pageInfo.currentPage - 1);

    state.data = [...state._data].splice(startIndex, state.pageInfo.limit)
}

const applySorting = () => {
    switch (state.orderBy) {
        case "A-Z":
            state.data.sort((a, b) => a.title < b.title ? -1 : 0);
            break;
        case "Z-A":
            state.data.sort((a, b) => a.title > b.title ? 1 : 0);
            break;
        case "ID-ASC":
            state.data.sort((a, b) => a.id - b.id);
            break;
        case "ID-DESC":
            state.data.sort((a, b)=> b.id - a.id);
            break;
        default: 
            state.data.sort((a,b)=> a.title < b.title ? -1 : 0);
            break;
        }
}


const init = async () => {
    await usersJson();
    await postJson();
    formatData();
    applyPageIndex();
    applySorting();
    console.log(state)

}

init()



