function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPage = window.location.pathname.split('/').pop();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // If no users exist and trying to access protected page, redirect to signup
    if (users.length === 0 && currentPage !== 'index.html' && currentPage !== 'signup.html' && currentPage !== 'login.html') {
        window.location.href = 'signup.html?redirect=' + currentPage;
        return;
    }
    
    // If users exist but not logged in, redirect to login
    if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== 'login.html' && currentPage !== 'signup.html') {
        window.location.href = 'login.html?redirect=' + currentPage;
        return;
    }

    // Update navbar based on login status
    if (isLoggedIn) {
        const currentUser = localStorage.getItem('currentUser');
        const navs = document.querySelectorAll('.nav-wrapper ul');
        navs.forEach(nav => {
            const logoutLi = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.className = 'grey-text';
            logoutLink.innerHTML = `<i class="material-icons left">logout</i>Logout (${currentUser})`;
            logoutLink.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            };
            logoutLi.appendChild(logoutLink);
            nav.appendChild(logoutLi);
        });
    }
}

// Run auth check when the page loads
document.addEventListener('DOMContentLoaded', checkAuth); 