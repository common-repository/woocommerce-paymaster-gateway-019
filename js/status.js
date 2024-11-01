/**
 * @author Maxim Vasiliev
 * Date: 21.01.2010
 * Time: 14:00
 */

(function(jQuery)
{
	/**
	 * jQuery.deserialize plugin
	 * Fills elements in selected containers with data extracted from URLencoded string
	 * @param data URLencoded data
	 * @param clearForm if true form will be cleared prior to deserialization
	 */
	jQuery.fn.deserialize = function(data, clearForm)
	{
		this.each(function(){
			deserialize(this, data, !!clearForm);
		});
	};

	/**
	 * Fills specified form with data extracted from string
	 * @param element form to fill
	 * @param data URLencoded data
	 * @param clearForm if true form will be cleared prior to deserialization
	 */
	function deserialize(element, data, clearForm)
	{
		var splits = decodeURIComponent(data).split('&'),
			i = 0,
			split = null,
			key = null,
			value = null,
			splitParts = null;

		if (clearForm)
		{
			jQuery('input[type="checkbox"],input[type="radio"]', element).removeAttr('checked');
			jQuery('select,input[type="text"],input[type="password"],input[type="hidden"],textarea', element).val('');
		}

		var kv = {};
		while(split = splits[i++]){
			splitParts = split.split('=');
			key = splitParts[0] || '';
			value = (splitParts[1] || '').replace(/\+/g, ' ');
			
			if (key != ''){
				if( key in kv ){
					if( jQuery.type(kv[key]) !== 'array' )
						kv[key] = [kv[key]];
					
					kv[key].push(value);
				}else
					kv[key] = value;				
			}
		}
		
		for( key in kv ){
			value = kv[key];
			
			jQuery('input[type="checkbox"][name="'+ key +'"][value="'+ value +'"],input[type="radio"][name="'+ key +'"][value="'+ value +'"]', element).prop('checked', true);
			jQuery('select[name="'+ key +'"],input[type="text"][name="'+ key +'"],input[type="password"][name="'+ key +'"],input[type="hidden"][name="'+ key +'"],textarea[name="'+ key +'"]', element).val(value);
		}
	}
})(jQuery);


jQuery(document).ready(
	jQuery('ul.order_notes li.note .note_content p').each(function(i,elem) {
		var Note_Message = jQuery(this).html();	var regV = 'PAYM';	var result = Note_Message.match(regV);
	if (result) {   
	// jQuery(this).append("Совпадение найдено");
	var re1 = "\[PAYM\]";
    var res = Note_Message.replace(re1, "");
	var re2 = "\[/PAYM\]";
    var res = res.replace(re2, "");
	
	jQuery(this).html(res);
	var uns = jQuery(this).deserialize(res, true);
	// var uns = deserialize(res);
	console.log(uns);
  
}  })
);
