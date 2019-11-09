export default function access(role){
    let userRole = role;
    return function(code) {
        return userRole === code;
    }
}
