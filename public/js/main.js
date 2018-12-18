$(document).ready(function(){
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
    var confirmation = confirm('Are you sure?');

    if(confirmation){
        $.ajax({
            type: 'DELETE',
            url: '/users/delete/'+$(this).data('id')
        }).done(function(response){
            //window.location('http://localhost:3000/');
            return true;
        });
        //window.location('http://localhost:3000/');
        //window.location('/');
        //window.location.replace('/');
        //console.log('users deleted');
    } else {
        return false;
    }
}