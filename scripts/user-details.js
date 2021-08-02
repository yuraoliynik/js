const userId = new URL(location).searchParams.get('userId');
console.log(userId);

function objectToHTML(object, divParent) {
    for (const property in object) {
        const propertyElement = divParent.appendChild(document.createElement('p'));

        if (typeof object[property] === 'object') {
            propertyElement.innerText = `${property}:`;
            objectToHTML(object[property], divParent);
        } else {
            propertyElement.innerText = `${property}: ${object[property]}`;
        }
    }
}

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(value => value.json())
    .then(value => {
        const userDetails = document.getElementsByClassName('userDetails')[0];

        objectToHTML(value, userDetails);

        const userPostsBtn = userDetails.appendChild(document.createElement('button'));
        userPostsBtn.innerText = 'post of current user';

        userPostsBtn.onclick = function() {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(value => value.json())
                .then(value => {
                    const posts = userDetails.appendChild(document.createElement('div'));

                    for (const post of value) {
                        const postCard = posts.appendChild(document.createElement('div'));

                        const postTitle = postCard.appendChild(document.createElement('p'));
                        postTitle.innerText = post.title;

                        const postDetailsBtn = postCard.appendChild(document.createElement('button'));
                        postDetailsBtn.innerText = 'Post details';

                        postDetailsBtn.onclick = function () {
                            window.location.href = `post-details.html?postId=${post.id}`;
                        }
                    }
                })
        }
    });