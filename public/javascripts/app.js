
//Screen Capture
var screenCapture =  new Vue({
   el:"#screenCapture",
    data :{
        screen :{
            webImage:undefined
        },
        loading : false
    },
    methods : {
        getScreenShot : function(){
            if(!this.screen.url)return;
            this.loading = true;
            this.screen.webImage = undefined;
            console.log('req gone')
            this.$http.get('/screen/shots',this.screen)
                .then(function(response){
                   if(response.data.success){
                       this.screen.webImage =  response.data.data.filename;
                   }else{
                       $.simplyToast(response.data.data,'danger');
                   }
                });
        }
    }
});

function imageLoaded(){
    screenCapture.loading = false;
}
function imageLoadError(){
    if(screenCapture.loading ){
        $.simplyToast("Error loading Webshots...","danger");
        screenCapture.loading = false;
        screenCapture.screen.webImage = undefined;
    }
}