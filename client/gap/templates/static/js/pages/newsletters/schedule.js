

var thisUpdateScheduleButt = document.getElementById("UpdateScheduleButt");

thisUpdateScheduleButt.addEventListener("click", function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (accessToken) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var providerData = user.providerData;
                var struid = user.uid;

                var vstrChoice = 7;

                var vstrListID = document.getElementById('strListID').value;
                var vstrDate = document.getElementById('strDate').value;
                var vstrTime = document.getElementById('strTime').value;

                var thisURL = "/admin/newsletters/" + vstrListID;
                var dataString = '&vstrChoice=' + vstrChoice + '&vstrListID=' + vstrListID + '&vstrDate=' + vstrDate +
                    '&vstrTime=' + vstrTime + '&vstrUserID=' + struid + '&vstrEmail=' + email + '&vstrAccessToken=' + accessToken;
                $.ajax({
                    type: "post",
                    url: thisURL,
                    data: dataString,
                    cache: false,
                    success: function (html) {
                        $('#UpdateScheduleINFDIV').html(html)
                    }
                });
            })
        }
    })
});

