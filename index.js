


const state = {
    users: [],
    posts: [],
    data:[],
    _data: []
}

 const usersJson = async ()=> {
    try {
        const result = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await result.json();
        state.users = users;
    } catch (error) {
        console.log(error)
    }
 }

 const postJson = async ()=> {
    try {
       const result = await fetch("https://jsonplaceholder.typicode.com/posts") 
       const posts = await result.json();
       state.posts = posts
    } catch (error) {
        console.log(error)
    }
}

const init = async ()=> {
     await usersJson();
     await postJson()
     console.log(state)
}

init()



