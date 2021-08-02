fetch('https://jsonplaceholder.typicode.com/users')
    .then(value => value.json())
    .then(value => {
        const users = document.getElementsByClassName('users')[0];

        for (const user of value) {
            const userCard = users.appendChild(document.createElement('div'));

            const userId = userCard.appendChild(document.createElement('h3'));
            userId.innerText = user.id.toString();

            const userName = userCard.appendChild(document.createElement('p'));
            userName.innerText = user.name;

            const userDetails = userCard.appendChild(document.createElement('p'));
            userDetails.innerText = user.name;
        }
    });