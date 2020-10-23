/**
* TODO:
* - add picture and company logo
*/
var vcard= {
    str_start:'BEGIN:VCARD\nVERSION:3.0\n',
    str_vcard:'BEGIN:VCARD\nVERSION:3.0\n',
    str_end:'\nEND:VCARD',
    goog_chart:'http://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=',
    form:[],
    get_field: function(field){
        for(var i in vcard.form){
            if(vcard.form[i].name === field){ 
                return vcard.form[i].value.replace(/^\s+|\s+$/g,"");
            } 
        }
    },
    add_you: function(){
        var first_name = vcard.get_field("first_name")
        vcard.str_vcard += 'FN:'+first_name
    },

    add_tel: function(){
     var cel1 = vcard.get_field("cel1"),
         cel2 = vcard.get_field("cel2"),
         whatsapp = vcard.get_field("whatsapp");
        
        if(cel1 !== ''){ vcard.str_vcard += '\nTEL;TYPE=Celular:'+cel1; }

        if(cel2 !== ''){ vcard.str_vcard += '\nTEL;TYPE=Celular:'+cel2; }
        
        if(whatsapp !== ''){ vcard.str_vcard += '\nTEL;TYPE=Whatsapp:'+whatsapp; }
    },
    add_email: function(){
       
        var work = vcard.get_field("org_email");
        
        if(work !== ''){ vcard.str_vcard += '\nEMAIL;TYPE=E-mail,work:'+work; }
    },
    add_url: function(){
       
        var work = vcard.get_field("org_url");
        
        if(work !== ''){ vcard.str_vcard += '\nURL;TYPE=URL:'+work; }
    },
    add_nota: function(){
       
        var nota = vcard.get_field("nota");
        
        if(nota !== ''){ vcard.str_vcard += '\nNOTE;TYPE=Nota:'+nota; }
    },
    required_check: function(){
        var first_name = vcard.get_field("first_name"),
            last_name = vcard.get_field("last_name"),
            msg = 'Field%FIELD% %NAME% %VERB% required.',
            fields = [];
        
        if(first_name === ''){ fields.push('First name'); }
        
        if(last_name === ''){ fields.push('Last name'); }
        
        if(fields.length === 0){ return ''; }
        
        msg = msg.replace('%NAME%',fields.join(', '));
        
        msg = msg.replace('%FIELD%',(fields.length === 1) ? '' : 's');
        
        msg = msg.replace('%VERB%',(fields.length === 1) ? 'is' : 'are'); 
            
        return msg;
    },
    save: function(){
        vcard.form = $('form').serializeArray();
        
        var required_check_output = vcard.required_check();
        
        if(required_check_output !== ''){
            alert(required_check_output);
            return;
        }
        
        vcard.add_you();
        
        vcard.add_tel();
        
        vcard.add_email();
        
        vcard.add_url();

        vcard.add_nota();

        vcard.str_vcard += vcard.str_end;
        
        $('textarea[name="vcard"]').val(vcard.str_vcard);
     
        $('#qr').attr('src',vcard.goog_chart+vcard.str_vcard.replace(/\n/g,'%0A'));
        
        vcard.str_vcard = vcard.str_start;
    }
};

$(document).ready(function(){
    $('input[name="submit"]').click(vcard.save);
});