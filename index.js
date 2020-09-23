
const name = document.querySelector(".name")
const password = document.querySelector(".password")
const addUser = document.querySelector(".addBtn")
const accounts = document.querySelector(".accounts")
const loginname = document.querySelector(".loginname")
const loginpassword = document.querySelector(".loginpassword")
const loginUser = document.querySelector(".loginBtn")
const title = document.querySelector(".title")
const content = document.querySelector(".content")
const createBtn = document.querySelector(".createBtn")
const blogs = document.querySelector(".blogs")
const inputEl = document.querySelector(".inputEl");
const addButton = document.querySelector(".addToDoBtn");



//create store in local storage
function createUserStore() {
    let userstore = JSON.parse(localStorage.getItem("accounts"));
    if (userstore === null) {
        localStorage.setItem("accounts", JSON.stringify([]));
        return userstore;
    }
    else {
        return userstore;
    }
}
createUserStore();

//create user account
function createAccount() {
    let userstore = createUserStore();
    const user_name = name.value;
    const user_password = password.value
    const user = {
        user_name,
        user_password
    }
    if (userstore.find(element => element.user_name === name.value)) {
        alert('Username already taken')
    }
    else {
        if (user_name.trim().length !== 0) {
            userstore.push(user);
            localStorage.setItem("accounts", JSON.stringify(userstore));
            //keep value of the authenticated user in localStorage variable loggedIn
            localStorage.setItem('loggedIn', name.value);
            //direct to the blog.html page for this new user
            window.location.replace('blog.html');
        } else {
            alert("Fill in the required fields")
        }
    }
}


//user log into account
function login() {
    let userstore = createUserStore();
    const auth_name = loginname
    const auth_pass = loginpassword
    if (userstore.find(element => element.user_name === auth_name.value)) {
        if ((userstore.find(element => element.user_name === auth_name.value && element.user_password === auth_pass.value))) {
            //keep value of the authenticated user in localStorage variable loggedIn
            localStorage.setItem('loggedIn', auth_name.value);
            //direct to the blog.html page after login
            window.location.replace('blog.html');
            //call retreveBlogs to display the blogs for this authenticated user
            retrieveBlogs();
        }
        else {
            alert('Incorrect password')
        }
    }
    else {
        alert('Your credentials dont match our records')
    }
}

//logout user
function logout() {
    //remove the localstorage variable loggedIn when logging out
    localStorage.removeItem('loggedIn');
    window.location.replace('login.html');
}

//create blogstore in local storage
function createBlogStore() {
    let blogstore = JSON.parse(localStorage.getItem("blogs"));
    if (blogstore === null) {
        localStorage.setItem("blogs", JSON.stringify([]));
        return blogstore;
    }
    else {
        return blogstore;
    }
}
createBlogStore();

function createBlog() {

    let blogstore = createBlogStore();
    //create an object which has the authenticated user and the blog he has posted
    const blog_user = {
        user_name: localStorage.getItem('loggedIn'),
        blogvalue: inputEl.value
    };
    if (inputEl.value.trim().length !== 0) {
        //push the created object into the todstore array as a string using stringify
        blogstore.push(JSON.stringify(blog_user));
        localStorage.setItem("blogs", JSON.stringify(blogstore));
        //display blogs 
        retrieveBlogs();
        deleteBlog();
        updateBlog();
    }
    else {
        alert("Your have no blogs")
        return
    }
}
//* show blogs
function retrieveBlogs() {
    let blogstore = createBlogStore();
    blogs.innerHTML = "";
    count = 0;
    blogstore.forEach(function (item, id) {

        const singleBlog = document.createElement("p");
        const deletebtn = document.createElement("button");
        const updatebtn = document.createElement("button");

        //if the user is  authenticated and this is one of his/her blogs, display his blog else hide that blog from her/him
        orla = JSON.parse(item);
        if (orla.user_name === localStorage.getItem('loggedIn')) {
            singleBlog.style.display = "block";
            singleBlog.style.border='black solid';
            singleBlog.style.borderWidth='thin';
            singleBlog.style.position='relative';
            singleBlog.style.height='100px';
            singleBlog.style.borderSpacing='200px'
            
        }
        else {
            singleBlog.style.display = "none";
        }

        deletebtn.innerHTML = "delete";
        deletebtn.className = "btn btn-danger deleteBtn";

        singleBlog.innerText = orla.blogvalue;
        updatebtn.innerHTML = "update";
        updatebtn.className = "btn btn-warning updateBtn";
        singleBlog.innerHTML = `<span>${orla.blogvalue}</span>`;
        singleBlog.appendChild(deletebtn);
        singleBlog.appendChild(updatebtn);
        deletebtn.className = `btn btn-danger deleteBtn ${id} `;

        blogs.appendChild(singleBlog);


    });
}
// *updateBlog
function updateBlog() {
    const updateButtons = document.querySelectorAll(".updateBtn");
    let blogstore = createBlogStore();
    updateButtons.forEach(function (button, index) {
        button.onclick = function () {
            const blog = this.parentElement.children[0];
            const updateBlog = prompt(`updateBlog:${blog.innerText}? Fill in the updated blog`);
            const blognow = {
                user_name: localStorage.getItem('loggedIn'),
                blogvalue: updateBlog
            };
            blogstore.splice(index, 1, JSON.stringify(blognow));
            localStorage.setItem("blogs", JSON.stringify(blogstore));
            retrieveBlogs();
            location.reload();
        };
    });
}

//* Delete Blog
function deleteBlog() {
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    let blogstore = createBlogStore();
    console.log(deleteButtons);
    console.log(deleteButtons);
    deleteButtons.forEach(function (button, index) {
        button.onclick = function () {
            blogstore.splice(index, 1);
            localStorage.setItem("blogs", JSON.stringify(blogstore));
            console.log(blogstore);
            retrieveBlogs();
            location.reload();
        };
    });
}
retrieveBlogs();
deleteBlog();
updateBlog();


addButton.onclick = createBlog;