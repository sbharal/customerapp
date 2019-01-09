$(document).ready(function(){
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
    var confirmation = confirm('Are you sure?');

    if(confirmation){
        $.ajax({
            type: 'DELETE',
            url: '/userdetails/delete/'+$(this).data('id')
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

// $(document).ready(function(){
//     $('.formSubmit').on('click', formSubmit);
// });

// function formSubmit(){
//     var confirmation = confirm('Are you sure?');

//     if(confirmation){
//         $.ajax({
//             type: 'POST',
//             url: http://localhost:5000/,
//             dataType: "jsonp",
//             crossDomain : true,
//             success : function(msg){
//                 alert(success);
//             },
//             error: function(req, status, error){
//                 alert(error);
//             }
//         })
//     }
// }