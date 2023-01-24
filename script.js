//Toggle class active
const navbarNav = document.querySelector('.navbar-nav');
//ketika cookies menu dikilik
document.querySelector('#cookies-menu').onclick =()=> {
  navbarNav.classList.toggle('active');
};

//klik di luar sidebar untuk menghilangkan
const cookies =document.querySelector('#cookies-menu');

document.addEventListener('click', function(e){
    if(!cookies.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
});
