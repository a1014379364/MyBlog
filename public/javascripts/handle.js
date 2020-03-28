/*鉴别input框内容*/
function isSL(inputElemnt,maxLength){
    $(inputElemnt).blur(function () {
        var len = this.value.length;
        var formElemnt = $(this).parents('form');

        if( !this.value || len>maxLength){
            $(this).parent().removeClass('has-success');
            $(this).parent().addClass('has-error');

        }else{
            $(this).parent().removeClass('has-error');
            $(this).parent().addClass('has-success');
        }

        isSubmit(formElemnt,maxLength);
    })
}

/*鉴别表单提交内容*/
function isSubmit(formElemnt,maxLength){
    var ckeditor = $(formElemnt).children('.form-group').children('#content');
    var children = $(formElemnt).children('.form-group').children('.must-fill');
    var sure = $(formElemnt).children('.sure');
    var length = children.length;
    var i = 0;

    for(; i<length ;i++){
        if( !children[i].value || children[i].value.length > maxLength ){
            sure.addClass('disabled');
            sure.attr("disabled",true);
            break;
        }
    }
    if(i == length){
        sure.attr("disabled",false);
        sure.removeClass('disabled');
    }

    // console.log(ckeditor);
    // if(ckeditor.length){
    //     var data = CKEDITOR.instances.content.getData();
    //     if(data){
    //         sure.attr("disabled",false);
    //         sure.removeClass('disabled');
    //     }
    // }
    
}