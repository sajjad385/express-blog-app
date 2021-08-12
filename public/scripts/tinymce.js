window.onload =()=>{
    tinymce.init({
        selector: '#tiny-mce-post-body',
        plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        // plugins: 'a11ychecker advcode casechange export formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
        toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter pageembed permanentpen table  image link media template emoticons',
        toolbar_mode: 'floating',
        height: 300,
        // tinycomments_mode: 'embedded',
        // tinycomments_author: 'Author name',
    });
}