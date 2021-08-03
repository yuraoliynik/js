const userId = new URL(location).searchParams.get('userId');

function objectToHTML(object, divParent) {
    for (const property in object) {
        const propertyElement = divParent.appendChild(document.createElement('p'));

        if (typeof object[property] === 'object') {
            propertyElement.innerText = `${property}:`;
            propertyElement.className = 'objectName'

            const propertyObject = divParent.appendChild(document.createElement('div'));
            propertyObject.className = 'objectWrap';
            objectToHTML(object[property], propertyObject);
        } else {
            propertyElement.innerText = `${property}: ${object[property]}`;
        }
    }
}

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(value => value.json())
    .then(value => {
        const userDetails = document.getElementsByClassName('userDetails')[0];

        const userInfo = userDetails.appendChild(document.createElement('div'));
        userInfo.className = 'userInfo';

        objectToHTML(value, userInfo);

        const userPostsBtn = userDetails.appendChild(document.createElement('button'));
        userPostsBtn.innerText = 'Posts of current user';

        userPostsBtn.onclick = function() {
            userPostsBtn.style.display = 'none';

            const postsHeader = userDetails.appendChild(document.createElement('h2'));
            postsHeader.className = 'header';
            postsHeader.innerText = 'Posts of current user';

            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(value => value.json())
                .then(value => {
                    const posts = userDetails.appendChild(document.createElement('div'));
                    posts.className = 'posts';

                    for (const post of value) {
                        const postCard = posts.appendChild(document.createElement('div'));
                        postCard.className = 'postCard';

                        const postTitle = postCard.appendChild(document.createElement('p'));
                        postTitle.innerText = `Post: ${post.id}. ${post.title[0].toUpperCase() + post.title.substring(1)}`;

                        const postDetailsBtn = postCard.appendChild(document.createElement('button'));
                        postDetailsBtn.innerText = 'Post details';

                        postDetailsBtn.onclick = function () {
                            window.location.href = `post-details.html?postId=${post.id}`;
                        }
                    }
                });
        }
    });