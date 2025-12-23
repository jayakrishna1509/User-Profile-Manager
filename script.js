 const addUserBtn = document.querySelector('#addUserBtn');
        const showUsersBtn = document.querySelector('#showUsersBtn');
        const clearUsersBtn = document.querySelector('#clearUsersBtn');
        const usersContainer = document.querySelector('#usersContainer');
        const userListHeading = document.querySelector('.user-list h2');
    
        let users = [];
   
        addUserBtn.addEventListener('click', function() {
            const userName = window.prompt('Enter user name:');
            
            if (userName) {
                const trimmedName = userName.trim();
                const upperCaseName = trimmedName.toUpperCase();
                
                const email = `${trimmedName.toLowerCase().replace(/\s+/g, '')}@example.com`;
                
                const newUser = {
                    id: users.length + 1,
                    name: upperCaseName,
                    email: email
                };
                
                users.push(newUser);
                
                updateUserList();
             
                addUserBtn.setAttribute('data-last-action', 'add');
                addUserBtn.setAttribute('data-user-count', users.length);
                
                window.alert('User added successfully!');
                
                setTimeout(() => {
                    console.log(`User "${upperCaseName}" was added.`);
                }, 500);
            }
        });
        
        showUsersBtn.addEventListener('click', function() {
            console.log('(User list in console)');
   
            users.forEach(user => {
                console.log(`Users: [{id: ${user.id}, name: '${user.name}', email: '${user.email}'}]`);
            });
            
            if (users.length > 0) {
                console.log('Object Methods Demo:');
                const sampleUser = users[0];
       
                console.log('Object.keys():', Object.keys(sampleUser));
                console.log('Object.values():', Object.values(sampleUser));
                console.log('Object.entries():', Object.entries(sampleUser));
                console.log('hasOwnProperty("name"):', sampleUser.hasOwnProperty('name'));
        
                const filteredUsers = users.filter(user => 
                    user.name.includes('J')
                );
                console.log('Filtered users with J:', filteredUsers);

                userListHeading.setAttribute('data-user-count', users.length);
            }
            console.log('End of User List');

            showUsersBtn.setAttribute('data-last-clicked', new Date().toISOString());
        });
        
        clearUsersBtn.addEventListener('click', function() {
            if (users.length === 0) {
                window.alert('No users to clear!');
                return;
            }
            
            const isConfirmed = window.confirm('Are you want to clear all users?');
            
            if (isConfirmed) {
                users.length = 0;
                
                updateUserList();
                
                clearUsersBtn.setAttribute('data-last-action', 'clear');
                clearUsersBtn.setAttribute('data-cleared-at', new Date().toISOString());
                
                window.alert('All users cleared!');
                
                console.log('All users have been cleared');
                
                setTimeout(() => {
                    console.log('(User list is now empty)');
                }, 500);
            }
        });
        
        function updateUserList() {
            usersContainer.innerHTML = '';
            
            if (users.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                
                const emptyParagraph = document.createElement('p');
                emptyParagraph.innerText = 'No users added. Click "Add New User" to get started.';
                emptyState.appendChild(emptyParagraph);
                
                usersContainer.appendChild(emptyState);
        
                usersContainer.setAttribute('data-state', 'empty');
                return;
            }
            
            usersContainer.setAttribute('data-state', 'populated');
            usersContainer.setAttribute('data-user-count', users.length);
            
            const userElements = users.map(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card';
                
                userCard.setAttribute('data-user-id', user.id);
                userCard.setAttribute('data-user-email', user.email);
                
                const userInfo = document.createElement('div');
                userInfo.className = 'user-info';
                
                const userName = document.createElement('h3');
                userName.innerText = user.name; 
                
                const userEmail = document.createElement('p');
                userEmail.innerText = user.email; 
                
                userInfo.appendChild(userName);
                userInfo.appendChild(userEmail);
                
                const userId = document.createElement('div');
                userId.className = 'user-id';
                userId.innerText = user.id; 
                
                userCard.appendChild(userInfo);
                userCard.appendChild(userId);
                
                return userCard;
            });
            
            userElements.forEach(element => {
                usersContainer.appendChild(element);
            });
            
            userListHeading.innerText = `User List`;
        }
        
        setTimeout(() => {
            console.log('User Profile Manager Initialized');
            console.log('Page URL:', window.location.href);
        }, 100);