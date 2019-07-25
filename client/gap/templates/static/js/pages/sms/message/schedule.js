try{
var config =
{
    apiKey: "AIzaSyBhNkqMr7zXi4r_bToSFiqPQ8BQLja47_g",
    authDomain: "sa-sms-b.firebaseapp.com",
    databaseURL: "https://sa-sms-b.firebaseio.com",
    projectId: "sa-sms-b",
    storageBucket: "sa-sms-b.appspot.com",
    messagingSenderId: "3221236137"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}else {
}

}catch (err){

}


var thisSetScheduleButt = document.getElementById("SetScheduleButt");
thisSetScheduleButt.addEventListener("click", function () {
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

                var vstrChoice = 3;
                var vstrGroupID = document.getElementById('strGroupID').value;
                var vstrMessageID = document.getElementById('strMessageID').value;
                var vstrScheduleTime = document.getElementById('strScheduleTime').value;
                if ($('#strNotifyOnStart').is(":checked")) {
                    vstrNotifyOnStart = "Yes"
                } else {
                    vstrNotifyOnStart = "No"
                }
                if ($('#strNotifyOnEnd').is(":checked")) {
                    vstrNotifyOnEnd = "Yes"
                } else {
                    vstrNotifyOnEnd = "No"
                }
                var thisURL = "/sms/manage/" + vstrGroupID;
                var dataString = '&vstrChoice=' + vstrChoice + '&vstrGroupID=' + vstrGroupID + '&vstrMessageID=' + vstrMessageID +
                    '&vstrScheduleTime=' + vstrScheduleTime + '&vstrNotifyOnStart=' + vstrNotifyOnStart + '&vstrNotifyOnEnd=' + vstrNotifyOnEnd +
                 '&vstrUserID=' + struid + '&vstrEmail=' + email + '&vstrAccessToken=' + accessToken;
                $.ajax({
                    type: "post",
                    url: thisURL,
                    data: dataString,
                    cache: false,
                    success: function (html) {
                        $('#SetScheduleINFDIV').html(html)
                    }
                });
            })
        }
    })
});