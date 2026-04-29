export default function authMiddleware(to, from, next){ 
    const isAuthenticated = localStorage.getItem('autenticado') === 'true';

    if(to.meta.requiresAuth && !isAuthenticated){
        next({name: 'login'})
    }else if (to.name === 'login' && isAuthenticated){
        next({name: 'home'})
    }
    else{
        next()
    }

}