const postId = new URL(location).searchParams.get('postId');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(value => value.json())
    .then(value => {
        const postDetails = document.getElementsByClassName('postDetails')[0];

        const postInfo = postDetails.appendChild(document.createElement('div'));
        postInfo.className = 'postInfo';

        for (const property in value) {
            const propertyElement = postInfo.appendChild(document.createElement('p'));

            if (property !== 'body') {
                propertyElement.innerText = `${property}: ${value[property]}`;
            } else {
                propertyElement.innerText = `${property}: \n${value[property]}`;
            }
        }

        const postCommentsBtn = postDetails.appendChild(document.createElement('button'));
        postCommentsBtn.innerText = 'Comments';

        postCommentsBtn.onclick = function() {
            postCommentsBtn.style.display = 'none';

            const commentsHeader = postDetails.appendChild(document.createElement('h2'));
            commentsHeader.className = 'header';
            commentsHeader.innerText = 'Comments of current post';

            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(value => value.json())
                .then(value => {
                    const comments = postDetails.appendChild(document.createElement('div'));
                    comments.className = 'comments';

                    for (const comment of value) {
                        const commentCard = comments.appendChild(document.createElement('div'));
                        commentCard.className = 'commentCard';

                        for (const property in comment) {
                            const element = commentCard.appendChild(document.createElement('p'));
                            element.innerText = `${property}: ${comment[property]}`;
                        }
                    }
                });
        }
    });