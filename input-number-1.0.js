function NumericInput(config){
	this.id = config.id;
	this.thousandSep = '';
	this.decimalSep = ',';

	var thisObj = this;

	if(typeof config.thousandSep !== "undefined") {
		this.thousandSep = config.thousandSep;
	}	

	if(typeof config.decimalSep !== "undefined") {
		this.decimalSep = config.decimalSep;
	}

	var filterExp = "^[0-9|\.|\,]+$";
	filterExp = filterExp.replace('.', this.thousandSep);
	filterExp = filterExp.replace(',', this.decimalSep);

	$( thisObj.id ).on( "propertychange input", function(e) {

		var reg = new RegExp(filterExp);
		var inputText = $(thisObj.id).val();
		var lastInput = inputText.substring(0, inputText.length-1);

		var key = inputText.substring(inputText.length-1,inputText.length);
		var isAfterComma = false;

		var isNumber = reg.test(inputText);

		if(!isNumber) {
			inputText = inputText.substring(0, inputText.length-1);
		}
		else if( 
			(key==this.decimalSep && inputText.length == 1) || 
			(key==thisObj.decimalSep && lastInput.indexOf(thisObj.decimalSep) != -1) 
		) {
			inputText = inputText.substring(0, inputText.length-1);
		}

		isAfterComma = inputText.indexOf(thisObj.decimalSep) != -1 && thisObj.decimalSep != '' ? true : false;

		//If using thousand sep
		if(this.thousandSep!='') {
			//Add thousand
			var inputFormated = "";
			var j = 0;
			inputText = inputText.split(thisObj.thousandSep).join('');
			var afterComma = '';
			if(isAfterComma) {
				var commaIndex = inputText.indexOf(thisObj.decimalSep);
				afterComma = inputText.substring(commaIndex,inputText.length);
				inputText = inputText.substring(0,commaIndex);
			}

			for(var i=inputText.length-1;i>=0;i--) {
				var temp = inputText.charAt(i);

				inputFormated = temp + inputFormated;
				if( j>0 && j%2 == 0 && i > 0 ) {
					inputFormated = thisObj.thousandSep + inputFormated;
					j = 0;
					continue;
				}
				j++;
			}

			//Merge decimal with thousand
			if(isAfterComma && inputText.length>0) {
				inputFormated = inputFormated + afterComma;
			}


			$(thisObj.id).val(inputFormated);
		}
		else {
			$(thisObj.id).val(inputText);
		}

	});

};